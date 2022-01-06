import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef, useContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import UserContext from '../../context/LoginState'
import Link from 'next/link'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'

interface itemProps {
  name: string
  description: string
  price: number
  seller: string
  _id: string
  image?: string
  quantity?: number
  listingEndDate?: Date
  ListingStartDate?: Date
}

interface shippingAddress {
  firstName: String
  lastName: String
  emailAddress: String
  country: String
  streetAddress: String
  city: String
  state: String
  postalCode: Number | null
}

const testItem: itemProps = {
  _id: '0xtest',
  name: 'Book of Spells',
  description: 'Lets you conquer the universe',
  price: 0.1,
  seller: '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF', // testing2
}

const Checkout: NextPage<itemProps> = () => {
  const [currentItem, setCurrentItem] = useState<itemProps | undefined>()
  const [walletAddress, setWalletAddress] = useState<string | Promise<string>>()
  const [isConnected, setIsConnected] = useState<String>('Connect Wallet')
  const [ethBalance, setEthBalance] = useState<Number>(0)
  const [chainId, setChainId] = useState<String>()
  const [error, setError] = useState<any>(null)
  const [provider, setProvider] = useState<any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [shippingAddress, setShippingAddress] = useState<shippingAddress>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: 0,
  })
  const [ethTxnId, setEthTxnId] = useState<String>()
  let txnId: String
  const firstName = useRef<any>()
  const lastName = useRef<any>()
  const emailAddress = useRef<any>()
  const country = useRef<any>()
  const streetAddress = useRef<any>()
  const city = useRef<any>()
  const state = useRef<any>()
  const postalCode = useRef<any>()
  const router = useRouter()
  const userLoginState = useContext(UserContext)

  const { id } = router.query
  // console.log('item id: ', id)
  // console.log('user login state: ', userLoginState)

  const fetchItemDetails = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setCurrentItem(data)
      console.log('sent database txn: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const initialiseWallet = async () => {
    if (isConnected === 'Disconnect') {
      setIsConnected('Connect Wallet')
    } else if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is present')
      setChainId(window.ethereum.chainId)
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      setProvider(provider)
      const myAddress = await signer.getAddress()
      const balance = await provider.getBalance(myAddress)
      const eth = parseFloat(ethers.utils.formatUnits(balance))
      const rounded = Math.round(eth * 10) / 10
      setEthBalance(rounded)
      setWalletAddress(myAddress)
      setIsConnected('Disconnect')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oh no!',
        text: 'Please install Metamask',
      })
    }
  }

  const changeNetwork = async () => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found')
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      })
    } catch (err: any) {
      setError(err.message)
      console.log('error changing network: ', err.message)
    }
  }

  const decodeToken = () => {
    console.log('Inside checkout page: decoding local storage token')
    let token = localStorage.getItem('token')
    console.log('Current Token: ', token)

    if (token) {
      let decodedToken: any = jwtDecode(token)
      console.log('Current decoded Token', decodedToken)
      return decodedToken
    }
  }

  const handleConfirmButton = async () => {
    if (currentItem !== undefined) {
      if (walletAddress === currentItem.seller) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You own this item',
        })
        return
      }
      const jwt = decodeToken()
      if (jwt.walletAddres !== walletAddress) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please use the wallet address you have logged in with to purchase this item.',
        })
        return
      }
      const shippingData: shippingAddress = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        emailAddress: emailAddress.current.value,
        country: country.current.value,
        streetAddress: streetAddress.current.value,
        city: city.current.value,
        state: state.current.value,
        postalCode: postalCode.current.value,
      }
      setShippingAddress(shippingData)
      const initialiseTxn = {
        seller: currentItem.seller,
        buyer: walletAddress,
        item: currentItem,
        salePrice: currentItem.price,
        purchaseDate: new Date(),
        orderStatus: 'Pending',
        shippingAddress: shippingData,
      }
      try {
        const res = await fetch(`${process.env.API_ENDPOINT}/transactions`, {
          method: 'POST',
          body: JSON.stringify(initialiseTxn),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        txnId = await res.json()
        console.log('sent database txn: ', txnId)
        await executeTransaction()
      } catch (err) {
        console.log('error posting transaction: ', err)
      }
    }
  }

  const executeTransaction = async () => {
    if (currentItem !== undefined) {
      console.log('price: ', currentItem.price)
      try {
        const txn = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: walletAddress,
              to: currentItem.seller,
              value: ethers.utils.parseUnits(currentItem.price.toString(), 'ether').toHexString(),
              maxFeePerGas: '0x2540be400',
              maxPriorityFeePerGas: '0x3b9aca00',
            },
          ],
        })
        setIsLoading(true)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You own this item',
        })
        setEthTxnId(txn)
        console.log('txn: ', txn)
        const receipt = await provider.waitForTransaction(txn)
        console.log('txn success: ', receipt)
        // update transactions database
        const res = await fetch(`${process.env.API_ENDPOINT}/transactions/${txnId}`, {
          method: 'PUT',
          body: JSON.stringify({
            orderStatus: 'Success',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        console.log('updated transactions database: ', data)
        // update items database
        const itemRes = await fetch(`${process.env.API_ENDPOINT}/items/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            status: 'Sold',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const itemData = await itemRes.json()
        console.log('updated items database: ', itemData)
        setIsLoading(false)
        router.push('/payment')
      } catch (err: any) {
        setError(err.message)
        console.log('error sending eth: ', err.message)
        const res = await fetch(`${process.env.API_ENDPOINT}/transactions/${txnId}`, {
          method: 'PUT',
          body: JSON.stringify({
            orderStatus: 'Failure',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        console.log('txn failure: ', data)
        setIsLoading(false)
      }
    }
  }

  const shortenAddress = (str: any) => {
    return str.substring(0, 4) + '...' + str.substring(str.length - 2)
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchItemDetails()
    }
  }, [id])

  // useEffect(() => {
  //   decodeToken()
  // })

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        setWalletAddress(window.ethereum.selectedAddress)
      })
      window.ethereum.on('chainChanged', function () {
        console.log('network changed')
        setChainId(window.ethereum.chainId)
      })
    }
    // add cleanup function here
  }, [])

  // if (userLoginState.isLoggedIn === false) {
  //   return (
  //     <div className="flex justify-center">
  //       <div className="p-5 bg-slate-200 border rounded-md w-1/3">
  //         <div className="flex justify-center mb-5">Please Log In to proceed</div>
  //         <div className="flex justify-center">
  //           <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2">
  //             <Link href="/login">Go to Login </Link>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className="m-5 flex justify-center">
        <h1 className="text-2xl underline underline-offset-8">Checkout</h1>
      </div>
      {currentItem !== undefined ? (
        <div>
          <div className="flex justify-center">
            <div className="md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="p-5 bg-slate-200 sm:p-6">
                  <h1 className="font-bold text-xl">Shipping Information</h1>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-md font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        ref={firstName}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-md font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        ref={lastName}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-md font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        ref={emailAddress}
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-md font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        ref={country}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Singapore</option>
                        <option>Australia</option>
                        <option>United States</option>
                        <option>Canada</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-md font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        ref={streetAddress}
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-md font-medium text-gray-700">
                        City
                      </label>
                      <input
                        ref={city}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-md font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        ref={state}
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-md font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        ref={postalCode}
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 m-10 w-2/5 bg-slate-200 border rounded-md relative">
              <h1 className="font-bold text-xl">Item Summary</h1>
              <div className="table w-full">
                <div className="table-header-group">
                  <div className="table-row">
                    <div className="table-cell text-left underline underline-offset-4">Name</div>
                    <div className="table-cell text-left underline underline-offset-4">
                      Description
                    </div>
                    <div className="table-cell text-left underline underline-offset-4">Price</div>
                  </div>
                </div>
                <div className="table-row-group">
                  <div className="table-row m-5">
                    <div className="table-cell m-5">{currentItem.name}</div>
                    <div className="table-cell m-5">{currentItem.description}</div>
                    <div className="table-cell m-5">{currentItem.price} ETH</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-5 font-bold text-xl">
                Total Payment: {currentItem.price} ETH
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="p-5 bg-slate-200 border rounded-md w-1/3">
              <h1 className="font-bold text-xl">Payment</h1>
              <div>
                <button
                  onClick={initialiseWallet}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
                  {isConnected}
                </button>
                <div>
                  {isConnected === 'Disconnect' ? (
                    <div>
                      <p>Wallet {shortenAddress(walletAddress)} is connected</p>
                      <p>Available ETH Balance: {ethBalance} ETH </p>
                      {chainId !== '0x4' ? (
                        <button onClick={changeNetwork}>Switch To Rinkeby</button>
                      ) : ethBalance > currentItem.price ? (
                        <div>
                          <button
                            onClick={handleConfirmButton}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
                            Confirm Payment
                          </button>
                        </div>
                      ) : (
                        <p>Insufficient Funds</p>
                      )}
                    </div>
                  ) : (
                    <p>Wallet not connected</p>
                  )}
                </div>
                {isLoading ? (
                  <div>
                    <button className="bg-yellow-300 p-3 rounded-md">Loading.... </button>
                    <div>
                      <a
                        href={'https://rinkeby.etherscan.io/tx/' + ethTxnId}
                        className="underline"
                        target="_blank"
                        rel="noreferrer">
                        View transaction on Etherscan
                      </a>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
          {error !== null ? (
            <div className="flex justify-center">
              <div className="mt-10 p-3 w-1/2 bg-red-100 border border-red-400 text-red-700 rounded">
                <span>{error}</span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Checkout

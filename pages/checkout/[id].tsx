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
  _id: string
  seller?: string
  image?: string
  quantity?: number
  listingEndDate?: Date
  ListingStartDate?: Date
}

const Checkout: NextPage<itemProps> = () => {
  const userLoginState = useContext(UserContext)
  const router = useRouter()
  const { id } = router.query

  const [currentItem, setCurrentItem] = useState<itemProps | undefined>()
  const [walletAddress, setWalletAddress] = useState<string | Promise<string>>()
  const [isConnected, setIsConnected] = useState<String>('Connect Wallet')
  const [ethBalance, setEthBalance] = useState<Number>(0)
  const [chainId, setChainId] = useState<String>()
  const [error, setError] = useState<any>(null)
  const [provider, setProvider] = useState<any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [ethTxnId, setEthTxnId] = useState<String>()
  let txnId: String
  const refFirstName = useRef<any>()
  const refLastName = useRef<any>()
  const refEmailAddress = useRef<any>()
  const refCountry = useRef<any>()
  const refStreetAddress = useRef<any>()
  const refCity = useRef<any>()
  const refState = useRef<any>()
  const refPostalCode = useRef<any>()
  const [input, setInput] = useState<any>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: 0,
  })
  const [firstNameEmpty, setFirstNameEmpty] = useState<boolean | null>(null)
  const [lastNameEmpty, setLastNameEmpty] = useState<boolean | null>(null)
  const [emailAddressEmpty, setEmailAddressEmpty] = useState<boolean | null>(null)
  const [countryEmpty, setCountryEmpty] = useState<boolean | null>(null)
  const [streetAddressEmpty, setStreetAddressEmpty] = useState<boolean | null>(null)
  const [cityEmpty, setCityEmpty] = useState<boolean | null>(null)
  const [stateEmpty, setStateEmpty] = useState<boolean | null>(null)
  const [postalCodeEmpty, setPostalCodeEmpty] = useState<boolean | null>(null)

  const handleChange = (event: any) => {
    const label = event.target.name
    const value = event.target.value
    setInput({ ...input, [label]: value })
    console.log('this is the input: ', input)
  }

  //To validate Email
  function validateEmail() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(input.emailAddress).toLowerCase())
  }

  ////to check if fields are empty
  const handleFirstNameBlur = (): void => {
    !refFirstName.current.value ? setFirstNameEmpty(true) : setFirstNameEmpty(false)
    // console.log("this is FirstNameblur: ", FirstNameEmpty)
  }
  const handleLastNameBlur = (): void => {
    !refLastName.current.value ? setLastNameEmpty(true) : setLastNameEmpty(false)
    // console.log("this is descpblur: ", LastNameEmpty)
  }
  const handleEmailAddressBlur = (): void => {
    !refEmailAddress.current.value ? setEmailAddressEmpty(true) : setEmailAddressEmpty(false)
    // console.log("this is EmailAddressblur: ", EmailAddressEmpty)
  }
  //   const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
  //   const handleEmailAddressBlur = () => {
  //     if (!refEmailAddress.current.value) {
  //       setEmailAddressEmpty(true)
  //     } else {
  //         const isValid = validateEmail(input.emailAddress)
  //         console.log("this is input email address",input.emailAddress)
  //         console.log("this is isvalid",isValid)

  //         setIsEmailValid(isValid)
  //         console.log("this is isemailvalid ", isEmailValid)
  //         setEmailAddressEmpty(false)
  //     }
  // }

  const handleCountryBlur = (): void => {
    !refCountry.current.value ? setCountryEmpty(true) : setCountryEmpty(false)
  }
  const handleStreetAddressBlur = (): void => {
    !refStreetAddress.current.value ? setStreetAddressEmpty(true) : setStreetAddressEmpty(false)
    // console.log("this is StreetAddressblur: ", StreetAddressEmpty)
  }
  const handleCityBlur = (): void => {
    !refCity.current.value ? setCityEmpty(true) : setCityEmpty(false)
    // console.log("this is city blur: ", CityEmpty)
  }
  const handleStateBlur = (): void => {
    !refState.current.value ? setStateEmpty(true) : setStateEmpty(false)
    // console.log("this is Stateblur: ", StateEmpty)
  }
  const handlePostalCodeBlur = (): void => {
    !refPostalCode.current.value ? setPostalCodeEmpty(true) : setPostalCodeEmpty(false)
  }

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
    console.log('input: ', input, 'currentItem', currentItem, 'validation: ', validateEmail())
    if (
      currentItem !== undefined &&
      // validateEmail() &&
      input.firstName &&
      input.lastName &&
      input.emailAddress &&
      input.country &&
      input.streetAddress &&
      input.city &&
      input.state &&
      input.postalCode
    ) {
      if (walletAddress === currentItem.seller) {
        console.log('item seller: ', currentItem.seller)
        console.log('wallet add: ', walletAddress)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You own this item',
        })
        return
      }
      const jwt = decodeToken()
      if (jwt.walletAddress !== walletAddress) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please use the wallet address you have logged in with to purchase this item.',
        })
        return
      }
      let shippingData = { ...input }

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
    } else {
      alert('Please fill in all the necessary fields')
      return
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
    <div className="font-Montserrat">
      <div className="flex w-full mb-8 ml-10">
        <div className="w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">
            Checkout
          </h1>
          <div className="h-1 w-20 bg-forestgreen rounded"></div>
        </div>
      </div>
      {currentItem !== undefined ? (
        <div className="grid grid-cols-2 ml-64 mr-64">
          <div>
            <div className="p-5">
              <h1 className="font-extrabold text-2xl mb-2 ">Item Summary</h1>
              <div className="p-5 bg-grey border rounded-md relative shadow ">
                <div className="table w-full">
                  <div className="table-header-group">
                    <div className="table-row">
                      <div className="table-cell text-left underline underline-offset-4">Name</div>
                      <div className="table-cell text-left underline underline-offset-4">
                        Description
                      </div>
                      <div className="table-cell text-left underline underline-offset-4">
                        Total Price
                      </div>
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
              </div>
            </div>

            <div className="p-5 shipping-info">
              <h1 className="font-extrabold text-2xl mb-2">Shipping Information</h1>
              <div className="shadow sm:rounded-md bg-grey p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="firstName" className="block text-md font-medium">
                      First name
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleFirstNameBlur}
                      ref={refFirstName}
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="givenName"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {firstNameEmpty ? <h1>Please enter first name</h1> : ''}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="lastName" className="block text-md font-medium">
                      Last name
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleLastNameBlur}
                      ref={refLastName}
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="familyName"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {lastNameEmpty ? <h1>Please enter last name</h1> : ''}
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="emailAddress" className="block text-md font-medium">
                      Email address
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleEmailAddressBlur}
                      ref={refEmailAddress}
                      type="text"
                      name="emailAddress"
                      id="emailAddress"
                      autoComplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {emailAddressEmpty ? <h1>Please enter email address</h1> : ''}
                    {validateEmail() ? '' : <h1>Please enter email in proper format</h1>}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-md font-medium">
                      Country
                    </label>
                    <select
                      onChange={handleChange}
                      onBlur={handleCountryBlur}
                      ref={refCountry}
                      id="country"
                      name="country"
                      autoComplete="country"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="">Choose country</option>
                      <option>Singapore</option>
                      <option>Australia</option>
                      <option>United States</option>
                      <option>Canada</option>
                    </select>
                    {countryEmpty ? <h1>Please choose country</h1> : ''}
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="streetAddress" className="block text-md font-medium">
                      Street address
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleStreetAddressBlur}
                      ref={refStreetAddress}
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      autoComplete="streetAddress"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {streetAddressEmpty ? <h1>Please enter street address</h1> : ''}
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="city" className="block text-md font-medium">
                      City
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleCityBlur}
                      ref={refCity}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {cityEmpty ? <h1>Please enter city</h1> : ''}
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="state" className="block text-md font-medium">
                      State / Province
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleStateBlur}
                      ref={refState}
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="address-level1"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {stateEmpty ? <h1>Please enter state</h1> : ''}
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postalCode" className="block text-md font-medium">
                      ZIP / Postal code
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handlePostalCodeBlur}
                      ref={refPostalCode}
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      autoComplete="postalCode"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {postalCodeEmpty ? <h1>Please enter postal code</h1> : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="p-5">
              <h1 className="font-extrabold text-2xl mb-2">Payment</h1>
              <div className="p-5 bg-grey shadow border rounded-md min-w-full">
                <div>
                  <button
                    onClick={initialiseWallet}
                    className="bg-lightorange hover:bg-orange-400 text-white border rounded-md p-2 m-2">
                    {isConnected}
                  </button>
                  <div>
                    {isConnected === 'Disconnect' ? (
                      <div>
                        <p className="m-1">Wallet {shortenAddress(walletAddress)} is connected</p>
                        <p className="m-1">Available ETH Balance: {ethBalance} ETH </p>
                        {chainId !== '0x4' ? (
                          <button onClick={changeNetwork}>Switch To Rinkeby</button>
                        ) : ethBalance > currentItem.price ? (
                          <div>
                            <button
                              onClick={handleConfirmButton}
                              className="bg-lightorange hover:bg-orange-400 text-white border rounded-md p-2 m-2">
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
            {/* error starts here  */}
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
        </div>
      ) : (
        <div className="flex justify-between ml-24">Loading...</div>
      )}
    </div>
  )
}

export default Checkout

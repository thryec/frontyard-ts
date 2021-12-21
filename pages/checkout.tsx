import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

interface itemProps {
  name: string
  description: string
  price: number
  seller: string
  _id?: string
  image?: string
  quantity?: number
  listingEndDate?: Date
  ListingStartDate?: Date
}

const testItem: itemProps = {
  name: 'Book of Spells',
  description: 'Lets you conquer the universe',
  price: 0.05,
  seller: '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF', // testing2
}

const Checkout: NextPage<itemProps> = () => {
  const [walletAddress, setWalletAddress] = useState<string | Promise<string>>()
  const [isConnected, setIsConnected] = useState<String>('Connect Wallet')
  const [ethBalance, setEthBalance] = useState<Number>(0)
  const [chainId, setChainId] = useState<String>()
  const [error, setError] = useState<any>(null)
  const [provider, setProvider] = useState<any>()
  const [signer, setSigner] = useState<any>()

  const initialiseWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is present')
      setChainId(window.ethereum.chainId)
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      setProvider(provider)
      setSigner(signer)
      const myAddress = await signer.getAddress()
      const balance = await provider.getBalance(myAddress)
      const eth = parseFloat(ethers.utils.formatUnits(balance))
      const rounded = Math.round(eth * 10) / 10
      setEthBalance(rounded)
      setWalletAddress(myAddress)
      setIsConnected('Connected')
    } else {
      alert('Please Install Metamask!')
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

  const executeTransaction = async () => {
    const params = [
      {
        from: walletAddress,
        to: testItem.seller,
        value: ethers.utils.parseUnits(testItem.price.toString(), 'ether').toHexString(),
      },
    ]
    try {
      const txn = await provider.send('eth_sendTransaction', params)
      const receipt = await provider.waitForTransaction(txn)
      console.log('txn success: ', receipt)
    } catch (err: any) {
      setError(err.message)
      console.log('error sending eth: ', err.message)
    }
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', () => {
      setWalletAddress(window.ethereum.selectedAddress)
    })
    window.ethereum.on('chainChanged', function () {
      console.log('network changed')
      setChainId(window.ethereum.chainId)
    })
    // console.log('ethereum object: ', window.ethereum)
  }, [])

  useEffect(() => {
    initialiseWallet()
  }, [walletAddress])

  return (
    <div>
      <div className="ml-5 mr-5 flex justify-center">
        <div className="mt-10">
          <div className="mb-10">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="/" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-slate-200 sm:p-6">
                    <h1 className="font-bold text-xl">Shipping Information</h1>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-md font-medium text-gray-700">
                          First name
                        </label>
                        <input
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
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-md font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-md font-medium text-gray-700">
                          Street address
                        </label>
                        <input
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
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="p-5 m-10 w-2/5 bg-slate-200 border rounded-md relative">
          <h1 className="font-bold text-xl">Item Summary</h1>
          <div className="flex justify-center">
            <span className="m-5">{testItem.name}</span>
            <span className="m-5">{testItem.description}</span>
            <span className="m-5">{testItem.price} ETH</span>
          </div>
          <div className="absolute bottom-5 font-bold text-xl">
            Total Payment: {testItem.price} ETH
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-5 w-1/2 bg-slate-200 border rounded-md">
          <h1 className="font-bold text-xl">Payment</h1>
          <div>
            <button
              onClick={initialiseWallet}
              className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
              {isConnected}
            </button>
            <button>Disconnect</button>
            <div>
              {isConnected === 'Connected' ? (
                <div>
                  <p>Wallet {walletAddress} is connected</p>
                  <p>Available ETH Balance: {ethBalance} ETH </p>
                  {chainId !== '0x4' ? (
                    <button onClick={changeNetwork}>Switch To Rinkeby</button>
                  ) : ethBalance > testItem.price ? (
                    <button
                      onClick={executeTransaction}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
                      Confirm Payment
                    </button>
                  ) : (
                    <p>Insufficient Funds</p>
                  )}
                </div>
              ) : (
                <p>Wallet not connected</p>
              )}
            </div>
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
  )
}

export default Checkout

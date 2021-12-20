import type { NextPage } from 'next'
import { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

interface itemProps {
  name: string
  description: string
  _id: string
  image: string
  price: number
  quantity: number
  listingEndDate: Date
  ListingStartDate: Date
}

const testItem = {
  name: 'Book of Spells',
  description: 'Lets you conquer the universe',
  price: 0.5,
}

const testSellersAddress = '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF'

const Checkout: NextPage<itemProps> = () => {
  const [walletAddress, setWalletAddress] = useState<String>()

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is present')
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const myAddress = await signer.getAddress()
      setWalletAddress(myAddress)
      console.log('my address: ', myAddress)
    } else {
      alert('Please Install Metamask!')
    }
  }

  return (
    <div>
      <div className="ml-5 mr-5 flex justify-center">
        <div className="p-5 m-10 w-2/5 bg-slate-200 border rounded-md">
          <h1 className="font-bold text-xl">Shipping Details</h1>
          <div className="mt-5 flex justify-items-start">
            <label htmlFor="name" className="mr-10">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="border-solid border border-gray-300 rounded-md w-2/3 justify-items-end"
            />
          </div>
          <div className="mt-5 flex justify-items-start">
            <label htmlFor="country" className="mr-10">
              Country:
            </label>
            <input
              type="text"
              id="country"
              className="border-solid border border-gray-300 rounded-md w-2/3 justify-items-end"
            />
          </div>
          <div className="mt-5 flex justify-items-start">
            <label htmlFor="address" className="mr-10">
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="border-solid border border-gray-300 rounded-md w-2/3"
            />
          </div>
          <div className="mt-5 flex justify-items-start">
            <label htmlFor="postal-code" className="mr-10">
              Postal Code:
            </label>
            <input
              type="text"
              id="postal-code"
              className="border-solid border border-gray-300 rounded-md w-2/3"
            />
          </div>
          <div className="mt-5 flex justify-items-start">
            <label htmlFor="mobile" className="mr-10">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobile"
              className="border-solid border border-gray-300 rounded-md w-2/3"
            />
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
          <h1 className="font-bold text-xl">Payment Methods</h1>
          <div>
            <button
              onClick={connectWallet}
              className="bg-indigo-500 text-white border rounded-md p-2 m-2">
              Metamask
            </button>
            <button className="bg-indigo-500 text-white border rounded-md p-2 m-2">
              Credit Card
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

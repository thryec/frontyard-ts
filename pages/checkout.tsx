import type { NextPage } from 'next'

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
const Checkout: NextPage<itemProps> = () => {
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
            <button className="bg-indigo-500 text-white border rounded-md p-2 m-2">Metamask</button>
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

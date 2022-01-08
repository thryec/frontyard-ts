import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Items = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)

  const loadData = async () => {
    const res = await fetch(`${process.env.API_ENDPOINT}/items/listed`)
    if (res.status !== 200) {
      console.error('Failed to fetch items')
      return
    }
    const data = await res.json()
    console.log('fetched data: ', data)
    setMarketItems(data)
    setIsLoaded(true)
  }

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

  const renderItems = marketItems.map((item: itemProps) => (
    <Link href={'/items/' + item._id} key={item._id}>
      {/* <div className="relative items-center justify-center">
    <div className="lg:flex items-center container mx-auto my-auto">
      <div className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8">
        <img src={item.image} alt=""className="overflow-hidden"/>
        <div className="p-4">
          <h3 className="font-medium text-gray-600 text-lg my-2 uppercase font-OpenSans">{item.name}</h3>
          <p className="text-justify font-OpenSans">{item.description}</p>
          <p className="text-justify font-bold font-OpenSans">{item.price} ETH</p>
          <div className="mt-5">
            <a href="" className="hover:orange-600 rounded-full py-2 px-3 font-semibold bg-lightorange text-white font-OpenSans">Buy</a>
          </div>
        </div>
      </div></div></div> */}

      <div className="shadow-md cursor-pointer m-2">
        <Image src={item.image} alt="" className="min-w-full" width="220px" height="220px" />
        <div className="px-4 align-baseline">
          <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2 font-Montserrat">
            {item.name}
          </h1>
          <p className="text-gray-700 mb-2 font-Montserrat">{item.description}</p>
          <div className="flex justify-between mt-4">
            <span className="mb-2 text-gray-800 font-bold font-Montserrat">{item.price} ETH</span>
          </div>
        </div>
      </div>
    </Link>
  ))

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="ml-10 max-w-full">
      {/* <h1 className="text-center text-2xl font-bold p-4 text-forestgreen font-Lora">All Items</h1> */}
      <div className="flex flex-wrap w-full mb-8">
        <div className="w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">
            All Listings
          </h1>
          <div className="h-1 w-20 bg-forestgreen rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-5 ">{loaded ? renderItems : 'No Items'}</div>
    </div>
  )
}

export default Items

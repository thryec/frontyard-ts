import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)

  const loadData = async () => {
    const res = await fetch('http://localhost:4000/items/listed')
    if (res.status !== 200) {
      console.error('Failed to fetch items')
      return
    }
    const data = await res.json()
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

  const renderItems = marketItems.map((item: itemProps) => {
    return (
      <div className="shadow-md w-1/6" key={item._id}>
        <Image src={item.image} alt={item.name} width="250px" height="250px" />
        <div className="px-4 align-baseline">
          <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">{item.name}</h1>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <div className="flex justify-between mt-4">
            <span className="font-thin text-sm">
              <Link href="/checkout">Buy</Link>
            </span>
            <span className="mb-2 text-gray-800 font-bold">{item.price} ETH</span>
          </div>
        </div>
      </div>
    )
  })

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="ml-10">
      <div>to add splash page here</div>
      <div className="mt-6 flex space-x-6">{loaded ? renderItems : 'No Items'}</div>
    </div>
  )
}

export default Home

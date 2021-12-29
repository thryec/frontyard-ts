import { useEffect, useState } from 'react'
import Link from 'next/link'

const Items = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)

  const loadData = async () => {
    const res = await fetch('http://localhost:3001/items')
    if (res.status !== 200) {
      console.error('Failed to fetch items')
      return
    }
    const data = await res.json()
    console.log('fetched data: ', data)
    setMarketItems(data)
    setIsLoaded(true)
  }

  const renderItems = marketItems.map((item) => (
    <Link href={'/items/' + item['name']} key={Date.now() + Math.random()}>
      <div className="shadow-md w-1/6" key={item['name']}>
        <img src={item['image']} alt="" className="min-w-full" />
        <div className="px-4 align-baseline">
          <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">{item['name']}</h1>
          <p className="text-gray-700 mb-2">{item['description']}</p>
          <div className="flex justify-between mt-4">
            <span className="font-thin text-sm">May 20th 2022</span>
            <span className="mb-2 text-gray-800 font-bold">{item['price']} ETH</span>
          </div>
        </div>
      </div>
    </Link>
  ))

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="ml-10">
      <div className="mt-6 flex space-x-6">{loaded ? renderItems : 'No Items'}</div>
    </div>
  )
}

export default Items

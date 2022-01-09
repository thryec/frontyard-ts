import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import jwtDecode from 'jwt-decode'
import Image from 'next/image'

const Home: NextPage = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)

  const loadData = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/listed/newest`)
      if (res.status !== 200) {
        console.error('Failed to fetch items')
        return
      }
      const data = await res.json()
      setMarketItems(data)
      setIsLoaded(true)
    } catch (error: any) {
      console.log(error.message);
    }

  }

  interface itemProps {
    name: string
    description: string
    _id: string
    image: string
    price: number
    quantity: number
    listingEndDate: Date
    listingStartDate: Date | any
  }

  const renderItems = marketItems.map((item: itemProps) => {
    const dateListed = item.listingStartDate.slice(0, 10)
    return (
      <Link href={'/items/' + item._id} key={item._id}>
        <div className="shadow-md w-1/6">
          <Image src={item.image} alt="" className="min-w-full" width="200px" height="200px" />
          <div className="px-4 align-baseline">
            <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">{item.name}</h1>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <div className="flex justify-between mt-4">
              <span className="font-thin text-sm">{dateListed}</span>
              <span className="mb-2 text-gray-800 font-bold">{item.price} ETH</span>
            </div>
          </div>
        </div>
      </Link>
    )
  })

  useEffect(() => {
    loadData()
    let token = localStorage.getItem('token')
    let tempToken: any = token
    if (tempToken) {
      let decodedToken: any = jwtDecode(tempToken)
      // console.log('decoded token: ', decodedToken)
    }
  }, [])

  return (
  <div className="flex flex-wrap justify-center items-center w-full">
  <div className="flex flex-wrap justify-center items-center w-9/12">
    <div className="flex flex-wrap justify-center items-center w-full"><img src="homebanner.png" width="75%" height="75%"/></div>
      <div className="flex flex-wrap justify-center items-center w-9/12">
        <div className="w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora pt-5">
            New Listings
          </h1>
          <div className="h-1 w-20 bg-forestgreen rounded"></div>
        </div>
      </div>
      <div className="flex justify-evenly w-9/12 items-center space-x-6">{loaded ? renderItems : 'No Items'}</div>
    </div>
  </div>
  )
}

export default Home

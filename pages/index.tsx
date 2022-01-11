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
      console.log(error.message)
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
    <div className="ml-10">
      <div>
        <nav className="bg-white shadow dark:bg-gray-800">
          <div className="container px-6 py-4 mx-auto">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-gray-700">
                  <a
                    className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                    href="#">
                    Brand
                  </a>
                </div>

                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="hidden -mx-4 lg:flex lg:items-center">
                <a
                  href="#"
                  className="block mx-4 mt-2 text-sm text-gray-700 capitalize lg:mt-0 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400">
                  Web developers
                </a>
                <a
                  href="#"
                  className="block mx-4 mt-2 text-sm text-gray-700 capitalize lg:mt-0 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400">
                  Web Designers
                </a>
                <a
                  href="#"
                  className="block mx-4 mt-2 text-sm text-gray-700 capitalize lg:mt-0 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400">
                  UI/UX Designers
                </a>
                <a
                  href="#"
                  className="block mx-4 mt-2 text-sm text-gray-700 capitalize lg:mt-0 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full bg-center bg-cover h-96 background-image: url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);">
          <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">
                Build Your new <span className="text-blue-400 underline">Saas</span>
              </h1>
              <button className="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Start project
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full mb-8">
        <div className="w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">
            New Listings
          </h1>
          <div className="h-1 w-20 bg-forestgreen rounded"></div>
        </div>
      </div>
      <div className="mt-6 flex space-x-6">{loaded ? renderItems : 'No Items'}</div>
    </div>
  )
}

export default Home

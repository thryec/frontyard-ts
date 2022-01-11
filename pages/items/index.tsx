import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Items = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)
  const router = useRouter();

  const loadData = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/listed`)
      if (res.status !== 200) {
        router.push('/failedlisting')
        console.error('Failed to fetch items')
        return
      }
      const data = await res.json()
      console.log('fetched data: ', data)
      setMarketItems(data)
      setIsLoaded(true)
    } catch (err: any) {
      router.push('/failedlisting')
      console.log(err.message);
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
        <div className="shadow-md cursor-pointer m-2">
          <Image src={item.image} alt="" className="min-w-full" width="220px" height="220px" />
          <div className="px-4 align-baseline">
            <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2 font-Montserrat">
              {item.name}
            </h1>
            <p className="text-gray-700 mb-2 font-Montserrat">{item.description}</p>
            <div className="flex justify-between mt-4">
              <span className="font-thin text-sm">{dateListed}</span>
              <span className="mb-2 text-gray-800 font-bold font-Montserrat">{item.price} ETH</span>
            </div>
          </div>
        </div>
      </Link>
    )
  })

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

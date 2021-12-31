import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const userAddress = '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226'
const itemId = '61b94c4b264e50a1c4c0232a'

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

interface shippingAddress {
  firstName: String
  lastName: String
  emailAddress: String
  country: String
  streetAddress: String
  city: String
  state: String
  postalCode: Number | null
}

interface transactions {
  _id: string
  buyer: string
  itemId: string
  orderStatus: string
  purchaseDate: Date
  salePrice: number
  seller: string
  shippindAddress: shippingAddress
}
;[]

const Transactions: NextPage = () => {
  const [purchaseData, setPurchaseData] = useState<transactions[]>([])
  const [salesData, setSalesData] = useState<transactions[]>([])
  const [testItem, setTestItem] = useState<itemProps>()
  const [dataLoaded, setDataLoaded] = useState<Boolean>(false)

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`http://localhost:4000/transactions/purchases?user=${userAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setPurchaseData(data)
      console.log('historical purchases: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const fetchSales = async () => {
    try {
      const res = await fetch(`http://localhost:4000/transactions/sales?user=${userAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setSalesData(data)
      //   console.log('historical sales: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const fetchItemDetails = async () => {
    try {
      const res = await fetch(`http://localhost:4000/items/${itemId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setTestItem(data)
      //   console.log('item details: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const renderPurchases = () => {
    if (testItem !== undefined && purchaseData !== undefined) {
      console.log('purchase data: ', purchaseData[0].purchaseDate)
      return (
        <div>
          <div className="flex border-b-2 p-5">
            <span className="mr-5">1.</span>
            <Image
              src="https://m.media-amazon.com/images/I/71huqcOKa+L._AC_SL1500_.jpg"
              alt="wand"
              width="100px"
              height="100px"
            />
            <div className="ml-5">
              <p>{testItem.name}</p>
              <p>{testItem.description} </p>
              <p>{testItem.price} ETH </p>
              <p>Purchase Date: {purchaseData[0].purchaseDate} </p>
            </div>
          </div>
        </div>
      )
    }
  }

  useEffect(() => {
    const fetchTxns = async () => {
      if (userAddress !== undefined) {
        await fetchPurchases()
        await fetchSales()
        setDataLoaded(true)
      }
    }
    fetchTxns()
    fetchItemDetails()
  }, [userAddress])

  return (
    <div>
      <div className="flex justify-center m-5">
        <h1 className="text-2xl underline underline-offset-8">Transaction History</h1>
      </div>
      <div className="flex justify-center">
        <div className="m-5 w-1/3">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">
            Items Purchased
          </h1>
          <div>{dataLoaded ? renderPurchases() : <div>Loading...</div>}</div>
        </div>
        <div className="border-double border-l-4 border-slate-500"></div>
        <div className="m-5 w-1/3">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">Items Sold</h1>
          {/* <div>{renderItem()}</div> */}
        </div>
      </div>
    </div>
  )
}

export default Transactions

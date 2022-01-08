import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import UserContext from '../context/LoginState'
import Link from 'next/link'

const userAddress = '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226'
const itemId = '61cfb6b18308bd18ab4b1a2e'

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
  item: itemProps
  orderStatus: string
  purchaseDate: Date
  salePrice: number
  seller: string
  shippindAddress: shippingAddress
}

const Transactions: NextPage = () => {
  const [purchaseData, setPurchaseData] = useState<transactions[]>([])
  const [salesData, setSalesData] = useState<transactions[]>([])
  const [testItem, setTestItem] = useState<itemProps>()
  const [dataLoaded, setDataLoaded] = useState<Boolean>(false)
  const userLoginState = useContext(UserContext)

  // console.log('user login state, ', userLoginState)

  const fetchPurchases = async () => {
    try {
      const res = await fetch(
        `${process.env.API_ENDPOINT}/transactions/purchases?user=${userAddress}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      setPurchaseData(data)
      console.log('historical purchases: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const fetchSales = async () => {
    try {
      const res = await fetch(
        `${process.env.API_ENDPOINT}/transactions/sales?user=${userAddress}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      setSalesData(data)
      console.log('historical sales: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const fetchItemDetails = async (id: string) => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setTestItem(data)
      return data
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const renderPurchases = () => {
    if (purchaseData.length !== 0) {
      return purchaseData.map((txn: transactions | any) => {
        console.log('purchase txn: ', txn)
        const date = txn.purchaseDate
        console.log('date: ', date)
        const dateFormatted = date.slice(0, 10)
        console.log('rendering')
        return (
          <div key={txn._id}>
            <div className="flex border-b-2 p-5">
              <Image src={txn.item.image} alt={txn.item.name} width="100px" height="100px" />
              <div className="ml-5">
                <p>{txn.item.name}</p>
                <p>{txn.item.description} </p>
                <p>{txn.item.price} ETH </p>
                <p>Date Purchased: {dateFormatted} </p>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  const renderSales = () => {
    if (salesData.length !== 0) {
      return salesData.map((txn: transactions | any) => {
        console.log('sales txn: ', txn)
        const date = txn.purchaseDate
        const dateFormatted = date.slice(0, 10)
        return (
          <div key={txn._id}>
            <div className="flex border-b-2 p-5">
              <Image src={txn.item.image} alt={txn.item.name} width="100px" height="100px" />
              <div className="ml-5">
                <p>{txn.item.name}</p>
                <p>{txn.item.description} </p>
                <p>{txn.item.price} ETH </p>
                <p>Date Sold: {dateFormatted} </p>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    const fetchTxns = async () => {
      if (userAddress !== undefined) {
        await fetchPurchases()
        await fetchSales()
        setDataLoaded(true)
        return
      }
    }
    fetchTxns()
  }, [userAddress])

  // if (userLoginState.isLoggedIn === false) {
  //   return (
  //     <div className="flex justify-center">
  //       <div className="p-5 bg-slate-200 border rounded-md w-1/3">
  //         <div className="flex justify-center mb-5">Please Log In to proceed</div>
  //         <div className="flex justify-center">
  //           <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2">
  //             <Link href="/login">Go to Login </Link>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

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
          <div>{dataLoaded ? renderSales() : <div>Loading...</div>}</div>
        </div>
      </div>
    </div>
  )
}

export default Transactions

import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import UserContext from '../context/LoginState'
import Link from 'next/link'
import jwtDecode from 'jwt-decode'
import NotLoggedIn from '../components/userNotLoggedin'
import { useRouter } from 'next/router'

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
  const [dataLoaded, setDataLoaded] = useState<Boolean>(false)
  const userLoginState = useContext(UserContext)
  const [walletAddress, setWalletAddress] = useState<String>()
  const router = useRouter()

  const fetchPurchases = async () => {
    try {
      const res = await fetch(
        `${process.env.API_ENDPOINT}/transactions/purchases?user=${walletAddress}`,
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
      router.push('/failedlisting')
    }
  }

  const fetchSales = async () => {
    try {
      const res = await fetch(
        `${process.env.API_ENDPOINT}/transactions/sales?user=${walletAddress}`,
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
      router.push('/failedlisting')
    }
  }

  const decodeToken = () => {
    console.log('Inside Header.tsx: decoding local storage token')
    let token = localStorage.getItem('token')
    if (token) {
      let decodedToken: any = jwtDecode(token)
      console.log('Current decoded Token', decodedToken)
      setWalletAddress(decodedToken.walletAddress)
    }
  }

  const renderPurchases = () => {
    if (purchaseData.length !== 0) {
      return purchaseData.map((txn: transactions | any) => {
        // console.log('purchase txn: ', txn)
        const date = txn.purchaseDate
        const dateFormatted = date.slice(0, 10)
        console.log('rendering')
        return (
          <div key={txn._id}>
            <div className="flex border-b-2 p-5 font-Montserrat">
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
    } else {
      return <div className="mt-5">No transactions</div>
    }
  }

  const renderSales = () => {
    if (salesData.length !== 0) {
      return salesData.map((txn: transactions | any) => {
        // console.log('sales txn: ', txn)
        const date = txn.purchaseDate
        const dateFormatted = date.slice(0, 10)
        return (
          <div key={txn._id}>
            <div className="flex border-b-2 p-5 font-Montserrat">
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
    } else {
      return <div className="mt-5">No transactions</div>
    }
  }

  useEffect(() => {
    const fetchTxns = async () => {
      if (walletAddress !== undefined) {
        await fetchPurchases()
        await fetchSales()
        setDataLoaded(true)
        return
      }
    }
    decodeToken()
    fetchTxns()
  }, [walletAddress])

  if (userLoginState.isLoggedIn === false) {
    return <NotLoggedIn />
  }

  return (
    <div>
      <div className="flex w-full mb-8 ml-10 ">
        <div className="w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">
            Transaction History
          </h1>
          <div className="h-1 w-20 bg-forestgreen rounded"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="m-5 w-1/3">
          <h1 className="text-xl underline underline-offset-8 font-Montserrat">Items Purchased</h1>
          <div>
            {dataLoaded ? (
              renderPurchases()
            ) : (
              <div className="flex justify-center  bg-white">
                <Image
                  className="h-16 w-16"
                  src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                  alt="loading"
                  width="100px"
                  height="100px"
                />
              </div>
            )}
          </div>
        </div>
        <div className="border-double border-l-4 border-slate-500"></div>
        <div className="m-5 w-1/3">
          <h1 className="text-xl underline underline-offset-8 font-Montserrat">Items Sold</h1>
          <div>
            {dataLoaded ? (
              renderSales()
            ) : (
              <div className="flex justify-center  bg-white">
                <Image
                  className="h-16 w-16"
                  src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                  alt="loading"
                  width="100px"
                  height="100px"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions

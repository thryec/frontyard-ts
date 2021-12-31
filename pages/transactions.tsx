import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const userAddress = '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226'
const itemId = '61b94c4b264e50a1c4c0232a'

const Transactions: NextPage = () => {
  const [purchaseData, setPurchaseData] = useState([])
  const [salesData, setSalesData] = useState([])

  const fetchPurchases = async () => {
    console.log('purchases button')
    try {
      const res = await fetch(`http://localhost:4000/transactions/purchases?user=${userAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setPurchaseData(data)
      console.log('sent database txn: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const fetchSales = async () => {
    console.log('sales button')
    try {
      const res = await fetch(`http://localhost:4000/transactions/sales?user=${userAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setSalesData(data)
      console.log('sent database txn: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  const itemCard = (
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
          <p>Item Name: </p>
          <p>Item Description: </p>
          <p>Purchase Date: </p>
          <p>Purchase Price: </p>
        </div>
      </div>
    </div>
  )

  const fetchItemDetails = async () => {
    try {
      const res = await fetch(`http://localhost:4000/items/${itemId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log('sent database txn: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  useEffect(() => {
    if (userAddress !== undefined) {
      fetchPurchases()
      fetchSales()
    }
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
          <div>{itemCard}</div>
        </div>
        <div className="border-double border-l-4 border-slate-500"></div>
        <div className="m-5 w-1/3">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">Items Sold</h1>
          <div>{itemCard}</div>
        </div>
      </div>
    </div>
  )
}

export default Transactions

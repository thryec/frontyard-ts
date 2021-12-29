import type { NextPage } from 'next'
import { useState } from 'react'

const userAddress = '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226'
const itemId = '61b94c4b264e50a1c4c0232a'

const Transactions: NextPage = () => {
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
      console.log('sent database txn: ', data)
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
      console.log('sent database txn: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  return (
    <div>
      <div className="flex justify-center m-5">
        <h1 className="text-2xl underline underline-offset-8">Transaction History</h1>
      </div>
      <div className="flex justify-center">
        <div className="m-5 w-1/3 flex justify-center">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">
            Items Purchased
          </h1>
          <button
            onClick={fetchPurchases}
            className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
            Fetch Purchases
          </button>
        </div>
        <div className="border-double border-l-4 border-slate-500"></div>
        <div className="m-5 w-1/3 flex justify-center">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">Items Sold</h1>
          <button
            onClick={fetchSales}
            className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
            Fetch Sales
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transactions

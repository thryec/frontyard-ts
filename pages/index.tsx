import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [data, setData] = useState<Response>()

  const loadData = async () => {
    const res = await fetch('http://localhost:4000/items')
    if (res.status !== 200) {
      console.error('failed to fetch holidays')
      return
    }
    const data = await res.json()
    console.log('fetched data: ', data)
    setData(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <h1 className="ml-10 text-3xl underline">Home Page</h1>
    </div>
  )
}

export default Home

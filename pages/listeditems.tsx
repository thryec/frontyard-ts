import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import UserContext from '../context/LoginState';
import NotLoggedIn from "../components/userNotLoggedin";

const Listed = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState()
  const userLoginState = useContext(UserContext)

  //to check for current user wallet address
  const decodeToken = () => {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken: any = jwtDecode(token);
      let currentUser = decodedToken.walletAddress;
      if (decodedToken) {
        setUser(currentUser);
      }
    }
  }

  const loadData = async () => {
    const res = await fetch(`${process.env.API_ENDPOINT}/items/listed/${user}`)
    if (res.status !== 200) {
      console.error('Failed to fetch items')
      return
    }
    const data = await res.json()
    console.log('fetched data: ', data)
    setMarketItems(data)
    setIsLoaded(true)
  }
  useEffect(() => {
    decodeToken()
    loadData()
  }, [loaded])

  interface itemProps {
    name: string
    description: string
    _id: string
    image: string
    price: number
    quantity: number
    listingEndDate: Date
    ListingStartDate: Date
  }

  const renderItems = marketItems.map((item: itemProps) => (
    <Link href={'/items/' + item._id} key={item._id}>
      <div className="shadow-md w-1/6">
        <img src={item.image} alt="" className="min-w-full" />
        <div className="px-4 align-baseline">
          <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">{item.name}</h1>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <div className="flex justify-between mt-4">
            <span className="font-thin text-sm">May 20th 2022</span>
            <span className="mb-2 text-gray-800 font-bold">{item.price} ETH</span>
          </div>
        </div>
      </div>
    </Link>
  ))

  return (
    <>
      {userLoginState.isLoggedIn ? (
      <div className="ml-10">
        <div className="mt-6 flex space-x-6">{loaded ? renderItems : 'No Items'}</div>
      </div>
    ) : <NotLoggedIn/>}
    </>
  )
}

export default Listed

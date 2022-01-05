import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image';
import UserContext from '../../context/LoginState';
import jwtDecode from 'jwt-decode';

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

const Details = () => {
  const [currentItem, setCurrentItem] = useState<any>()
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const [user, setUser] = useState<any>()
  const [seller, setSeller] = useState<any>()
  const [canBuy, setCanBuy] = useState<Boolean>(false)
  const [canDelete, setCanDelete] = useState<Boolean>(false)
  const router = useRouter()
  const { id } = router.query
  const userLoginState = useContext(UserContext);

  const fetchItemDetails = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setCurrentItem(data)
      setSeller(data.seller)
      setIsLoaded(true)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchItemDetails()
    }
  }, [id])

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

  useEffect(() => {
    decodeToken();
  }, []);

  const checkBuy = () => {
    if (isLoaded && userLoginState.isLoggedIn) {
      if (user!==seller) {
        setCanBuy(true)
      }
    }
  }

  const checkDelete = () => {
    if (isLoaded && userLoginState.isLoggedIn) {
      if (user===seller) {
        setCanDelete(true)
      }
    }
  }
  
  useEffect(() => {
    checkBuy();
    checkDelete();
  }, [isLoaded]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("success")
      router.push("/items");
    } catch (err) {
      console.log('delete failed: ', err)
    }
  }

  return (
    <div>
      {isLoaded ? (
        <div>
          <Image src={currentItem.image} width="200px" height="200px"/>
          <h1>Listing Title: {currentItem.name}</h1>
          <h1>Description: {currentItem.description}</h1>
          <h1>Price: {currentItem.price} ETH</h1>
          {userLoginState.isLoggedIn ? "" : (
            <Link href={'/login'}>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
                Login to Buy
              </button>
            </Link>
          )}
          {canBuy ? (
            <Link href={'/checkout/' + currentItem._id}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
              Buy
            </button>
            </Link>
          )
           : ""}
          {canDelete ? (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2" onClick={handleDelete}>
            Delete
            </button>
          )
           : ""}
          <Link href={'/items'}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
              Back to Item Listing
            </button>
          </Link>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  )
}

export default Details

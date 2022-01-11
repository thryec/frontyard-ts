import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/LoginState'
import jwtDecode from 'jwt-decode'

const Details = () => {
  const [currentItem, setCurrentItem] = useState<any>()
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const [user, setUser] = useState<any>()
  const [seller, setSeller] = useState<any>()
  const [canBuy, setCanBuy] = useState<Boolean>(false)
  const [isSeller, setIsSeller] = useState<Boolean>(false)
  const router = useRouter()
  const { id } = router.query
  const userLoginState = useContext(UserContext)

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
    let token = localStorage.getItem('token')
    if (token) {
      let decodedToken: any = jwtDecode(token)
      let currentUser = decodedToken.walletAddress
      if (decodedToken) {
        setUser(currentUser)
      }
    }
  }

  useEffect(() => {
    decodeToken()
  }, [])

  const checkBuy = () => {
    if (isLoaded && userLoginState.isLoggedIn) {
      if (user !== seller) {
        setCanBuy(true)
      }
    }
  }

  const checkUser = () => {
    if (isLoaded && userLoginState.isLoggedIn) {
      if (user === seller) {
        setIsSeller(true)
      }
    }
  }

  useEffect(() => {
    checkBuy()
    checkUser()
  }, [isLoaded])

  return (
    <div>
      {isLoaded ? (
        <div>
          <section className="text-gray-700 body-font overflow-hidden font-Montserrat">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap w-full mb-8">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">
                    Item Detail
                  </h1>
                  <div className="h-1 w-20 bg-forestgreen rounded"></div>
                </div>
              </div>
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                  src={currentItem.image}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 font-Lora">
                    {currentItem.name}
                  </h1>

                  <p className="leading-relaxed font-Montserrat">{currentItem.description}</p>

                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900 font-Montserrat">
                        {currentItem.price} ETH
                      </span>
                    </div>
                  </div>

                  {isSeller ? (
                    <p className="leading-relaxed font-Montserrat text-red-500">
                      This is your listed item.{' '}
                    </p>
                  ) : (
                    ''
                  )}

                  <div className="flex">
                    {userLoginState.isLoggedIn ? (
                      ''
                    ) : (
                      <Link href={'/login'}>
                        <button className="flex ml-auto text-white bg-lightorange border-0 py-2 px-6 focus:outline-none hover:bg-lightorange-600 rounded font-Montserrat">
                          Login to Buy
                        </button>
                      </Link>
                    )}
                    {canBuy ? (
                      <Link href={'/checkout/' + currentItem._id}>
                        <button className="flex ml-auto text-white bg-lightorange border-0 py-2 px-6 focus:outline-none hover:bg-lightorange-600 rounded font-Montserrat">
                          Buy
                        </button>
                      </Link>
                    ) : (
                      ''
                    )}
                    {isSeller ? (
                      <Link href={'/listeditems'}>
                        <button className="flex ml-0 text-white bg-lightorange border-0 py-2 px-6 focus:outline-none hover:bg-lightorange-600 rounded font-Montserrat">
                          See Your Listed Items
                        </button>
                      </Link>
                    ) : (
                      ''
                    )}
                    <Link href={'/items'}>
                      <button className="flex ml-auto text-white bg-lightorange border-0 py-2 px-6 focus:outline-none hover:bg-lightorange-600 rounded font-Montserrat">
                        Back to Item Listing
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Details

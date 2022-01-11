import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import UserContext from '../context/LoginState';
import NotLoggedIn from "../components/userNotLoggedin";
// import NoListedItems from '../components/noListedItems'

const Listed = () => {
  const [marketItems, setMarketItems] = useState([])
  const [loaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState()
  const userLoginState = useContext(UserContext)
  const router = useRouter();

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
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/listed/${user}`)
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
  useEffect(() => {
    decodeToken()
    loadData()
  }, [loaded, marketItems])

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

  const handleDelete = async (item: any) => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/${item}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("success")
      router.push("/listeditems");
    } catch (err) {
      router.push('/failedlisting')
      console.log('delete failed: ', err)
    }
  }

//   const renderItems = marketItems.map((item: itemProps) => (
//     <Link href={'/items/' + item._id} key={item._id}>
//       <div className="shadow-md w-1/6 cursor-pointer">
//         <img src={item.image} alt="" className="min-w-full" />
//         <div className="px-4 align-baseline">
//           <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2 font-Montserrat">{item.name}</h1>
//           <p className="text-gray-700 mb-2 font-Montserrat">{item.description}</p>
//           <div className="flex justify-between mt-4">
//             <span className="mb-2 text-gray-800 font-bold font-Montserrat">{item.price} ETH</span>
//             <button className="font-Montserrat" onClick={() => handleDelete(item._id)}>delete</button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   ))

//   return (
//     <>
//       {userLoginState.isLoggedIn ? (
//         <div className="ml-10  max-w-full">
//           <div className="flex flex-wrap w-full mb-8">
//             <div className="w-full mb-6 lg:mb-0">
//               <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">Your Listed Items</h1>
//               <div className="h-1 w-20 bg-forestgreen rounded"></div>
//             </div>
//           </div>
//           <div className="mt-6 flex space-x-6">{loaded ? renderItems : <h1>no items</h1>}</div>
//         </div>
//       ) : <NotLoggedIn />}
//     </>
//   )

const renderItems = marketItems.map((item: itemProps) => {
  const dateListed = item.listingStartDate.slice(0, 10);
    return(
    <tr key={item._id}>
      <Link href={'/items/' + item._id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-20 h-20">
              <img className="w-full h-full" src={item.image} alt="" />
            </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {item.name}
                </p>
              </div>
            </div>
        </td>
      </Link>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
          {item.description}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {dateListed}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {item.price} ETH
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {/* <p className="text-gray-900 whitespace-no-wrap"> */}
            <button className="font-Montserrat" onClick={() => handleDelete(item._id)}>delete</button>
          {/* </p> */}
        </td>
    </tr>
    )
})

return (
    <>
      {userLoginState.isLoggedIn ? (
        <>
        <div className="ml-10  max-w-full">
          <div className="flex flex-wrap w-full mb-8">
             <div className="w-full mb-6 lg:mb-0">
               <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">Your Listed Items</h1>
               <div className="h-1 w-20 bg-forestgreen rounded"></div>
             </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Item
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Listing Date
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Price
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {loaded ? renderItems : <tr><td><p>Loading...</p></td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      ) : <NotLoggedIn />}
    </>
)}

export default Listed

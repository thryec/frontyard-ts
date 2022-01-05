import React, {useState, useContext, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import UserContext from '../context/LoginState';
import jwtDecode from 'jwt-decode';

//uncontrolled
const Sell = () => {
  const router = useRouter()
  const userLoginState = useContext(UserContext);

  const refName = useRef<any>();
  const refDescription = useRef<any>();
  const refImage = useRef<any>();
  const refPrice = useRef<any>();

  const [] = useState<any>();
  const [] = useState<any>();
  const [] = useState<any>();

  const checkLoginStatus = () => {
    let token = localStorage.getItem('token');
    if (token) {
      userLoginState.setLoginState(true);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let token: string | null = localStorage.getItem('token');
    if (token) {
      let decodedToken: any = jwtDecode(token);
      let sellerWallet = decodedToken.walletAddress;
      const newItem = {
        name : refName.current.value,
        description : refDescription.current.value,
        image : refImage.current.value,
        price : refPrice.current.value,
        seller : sellerWallet,
      }
      try {
        const res = await fetch(`${process.env.API_ENDPOINT}/items`, {
          method: 'POST',
          body: JSON.stringify(newItem),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data : any = await res.json();
        router.push(`/items/${data._id}`);
      } catch (err) {
        console.log(err);
        router.push("/failedlisting");
      }
    }
  }

  // if (userLoginState.isLoggedIn === false) {
  //   return (
  //     <div className="flex justify-center">
  //       <div className="p-5 bg-slate-200 border rounded-md w-1/3">
  //         <div className="flex justify-center mb-5">Please Log In to proceed</div>
  //         <div className="flex justify-center">
  //           <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2">
  //             <Link href="/login">Go to Login</Link>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      <h1 className="ml-10">List Item Here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Listing Title: </label>
        <input type="text" name="name" ref={refName}></input><br/>
        <label htmlFor='description'>Description: </label>
        <input type="text" name="description" ref={refDescription}></input><br/>
        <label htmlFor='image'>Image URL: </label>
        <input type="text" name="image" ref={refImage}></input><br/>
        <label htmlFor='price'>Price (ETH): </label>
        <input type="text" name="price" ref={refPrice}></input><br/>
        <input type="submit" value="List Item"/>
      </form>
    </>
  )
}

export default Sell

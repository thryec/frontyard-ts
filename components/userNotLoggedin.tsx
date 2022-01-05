import { useContext } from 'react';
import Link from 'next/link';
import UserContext from '../context/LoginState';

const NotLoggedIn = (props:any) => {
const userLoginState = useContext(UserContext)

  if (userLoginState.isLoggedIn === false) {
    return (
      <div className="flex justify-center">
        <div className="p-5 bg-slate-200 border rounded-md w-1/3">
          <div className="flex justify-center mb-5">Please Log In to View</div>
          <div className="flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2">
              <Link href="/login">Go to Login</Link>
            </button>
          </div>
        </div>
      </div>
    )
  } else {
      return <>{props}</>
  }
}

export default NotLoggedIn
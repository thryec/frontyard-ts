import { useContext } from 'react'
import Link from 'next/link'
import UserContext from '../context/LoginState'

const NotLoggedIn = (props: any) => {
  const userLoginState = useContext(UserContext)

  if (userLoginState.isLoggedIn === false) {
    return (
      <div className="flex justify-center font-Montserrat">
        <div className="p-10 bg-grey border rounded-md w-1/3">
          <div className="flex justify-center mb-5">Please Log In to View</div>
          <div className="flex justify-center">
            <button className="bg-lightorange hover:bg-orange-400 text-white border rounded-md p-2">
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

import 'tailwindcss/tailwind.css'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserContext from '../context/LoginState'

const Header = () => {
  const userLoginState = useContext(UserContext)

  const handleLogoutClick = () => {
    localStorage.clear()
    userLoginState.setLoginState(false)
  }

  const connectWallet = () => {}

  return (
    <header className="flex justify-center mt-10">
      <div className="logo">
        <Link href="/">
          <a className="mr-10">
            <Image src="/backdoor.png" width="200px" height="100px" alt="backdoor" />
          </a>
        </Link>
      </div>
      <nav>
        <Link href="/items">
          <a className="mr-10 text-dullred">All Items</a>
        </Link>
        {userLoginState.isLoggedIn ? (
          <>
            <Link href="/">
              <a onClick={handleLogoutClick} className="mr-10">
                Logout
              </a>
            </Link>
            <Link href="/users">
              <a className="mr-10">users</a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup">
              <a className="mr-10">Sign Up</a>
            </Link>
            <Link href="/login">
              <a className="mr-10">Login</a>
            </Link>
            <Link href="/listItem">
              <a className="mr-10">Sell</a>
            </Link>
          </>
        )}
      </nav>
      <div>
        <button
          onClick={connectWallet}
          className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
          Connect Wallet
        </button>
      </div>
    </header>
  )
}

export default Header

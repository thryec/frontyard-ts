import 'tailwindcss/tailwind.css'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserContext from '../context/LoginState'
import jwtDecode from 'jwt-decode'
import SearchBar from './searchbar'

const Header = () => {
  const userLoginState = useContext(UserContext)
  const [userRole, setUserRole] = useState<String>()

  const handleLogoutClick = () => {
    localStorage.clear()
    userLoginState.setLoginState(false)
    setUserRole('')
  }

  const decodeToken = () => {
    console.log('Inside Header.tsx: decoding local storage token')
    let token = localStorage.getItem('token')
    console.log('Current Token: ', token)

    if (token) {
      let decodedToken: any = jwtDecode(token)
      console.log('Current decoded Token', decodedToken)
      if (decodedToken) {
        setUserRole(decodedToken.role)
      }
    }
  }

  const checkLoginStatus = () => {
    let token = localStorage.getItem('token')
    if (token) {
      userLoginState.setLoginState(true)
    }
  }

  useEffect(() => {
    checkLoginStatus()
    decodeToken()
    console.log('current user role', userRole)
  }, [userRole, userLoginState])

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
            <Link href="/listItem">
              <a className="mr-10">Sell</a>
            </Link>
            {userRole == 'admin' ? (
              <Link href="/users">
                <a className="mr-10">users</a>
              </Link>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <Link href="/signup">
              <a className="mr-10">Sign Up</a>
            </Link>
            <Link href="/login">
              <a className="mr-10">Login</a>
            </Link>
          </>
        )}
        <SearchBar />
      </nav>
    </header>
  )
}

export default Header

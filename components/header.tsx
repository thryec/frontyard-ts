import 'tailwindcss/tailwind.css'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import UserContext from '../context/LoginState'
import jwtDecode from 'jwt-decode'

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
        <h1 className='font-Lora text-4xl float-left text-forestgreen'>backyard.</h1>
        {/* <Link href="/">
          <a className="mr-10">
            <Image src="/backdoor.png" width="200px" height="100px" alt="backdoor" />
          </a>
        </Link> */}
      </div>
      <nav>
        <Link href="/items">
          <a className="mr-10 text-white text-lg font-OpenSans text-center m-10 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-lightorange hover:bg-brightorange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brightorange-500">Buy</a>
        </Link>
        {userLoginState.isLoggedIn ? (
          <>
              <Link href="/listeditems">
              <a className="mr-10 font-OpenSans">
                Listed Items
              </a>
            </Link>
            <Link href="/sell">
              <a className="mr-10 font-OpenSans">Sell</a>
            </Link>
            <Link href="/">
              <a onClick={handleLogoutClick} className="mr-10 font-OpenSans">
                Logout
              </a>
            </Link>
            {userRole == 'admin' ? (
              <Link href="/users">
                <a className="mr-10 font-OpenSans">users</a>
              </Link>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <Link href="/signup">
              <a className="mr-10 font-OpenSans">Sign Up</a>
            </Link>
            <Link href="/login">
              <a className="mr-10 font-OpenSans">Login</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header

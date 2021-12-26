import 'tailwindcss/tailwind.css'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserContext from '../context/LoginState'
import { useRouter } from 'next/router'

const Header = () => {
  const userLoginState = useContext(UserContext);

  const handleLogoutClick = () => {
    localStorage.clear();
    userLoginState.setLoginState(false);
  }
  return (
    <header>
      <div className="logo">
        <Link href="/">
          <a className="mr-10">
            <img src="/backdoor.png" />
          </a>
        </Link>
      </div>
      <nav>
        <Link href="/items">
          <a className="mr-10 text-dullred">All Items</a>
        </Link>
        {
          userLoginState.isLoggedIn ? <Link href="/"><a onClick={handleLogoutClick} className="mr-10">Logout</a></Link>
            :
            <> <Link href="/signup">
              <a className="mr-10">Sign Up</a>
            </Link>
              <Link href="/login">
                <a className="mr-10">Login</a>
              </Link>
              <Link href="/listItem">
                <a className="mr-10">Sell</a>
              </Link> </>
        }
      </nav>
    </header>
  )
}

export default Header

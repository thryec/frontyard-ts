import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import UserContext from "../context/LoginState"
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const [userLoginState, setLoginState] = useState(false);
  const userLoginData = {
    isLoggedIn: userLoginState,
    setLoginState: (state: boolean) => setLoginState(state)
  }

  return (
    <div>
      <UserContext.Provider value={userLoginData}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </div>
  )
}

export default MyApp

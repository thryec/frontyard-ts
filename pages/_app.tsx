import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import UserContext from "../context/LoginState"
import { useState, useEffect } from 'react'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {

  const [userLoginState, setLoginState] = useState(false);
  const userLoginData = {
    isLoggedIn: userLoginState,
    setLoginState: (state: boolean) => setLoginState(state)
  }

  return (

    <div className='bg-lightgrey'>
      <UserContext.Provider value={userLoginData}>
        <Head>
          <title>BACKDOOR | {Component.name}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </div>
  )
}

export default MyApp

import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import UserContext from "../context/LoginState"
import { useState } from 'react'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {

  const [userLoginState, setLoginState] = useState(false);
  const userLoginData = {
    isLoggedIn: userLoginState,
    setLoginState: (state: boolean) => setLoginState(state)
  }

  let tabTitle = Component.name;
  console.log(typeof tabTitle)
  console.log(typeof Component.name)

  return (

    <div>
      <UserContext.Provider value={userLoginData}>
        <Head>
          <title>backyard. | {tabTitle}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </div>
  )
}

export default MyApp

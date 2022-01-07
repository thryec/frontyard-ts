import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UserContext from '../context/LoginState'
import Swal from 'sweetalert2'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const userLoginContext = useContext(UserContext)

  interface LoginDetails {
    email: string
    password: string
  }

  interface ErrorLog {
    status: number
    message: string
  }

  const [login, setLogin] = useState<LoginDetails>({ email: '', password: '' })
  const [loginError, SetLoginError] = useState<ErrorLog | null>(null)

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      email: event.currentTarget.value,
    })
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      password: event.currentTarget.value,
    })
  }

  const handleSubmit = async () => {
    try {
      //Login Post request
      const response = await fetch(`${process.env.API_ENDPOINT}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      })

      const decodedResponse = await response.json()

      if (decodedResponse.status === 401) {
        SetLoginError({
          status: decodedResponse.status,
          message: decodedResponse.message,
        })
        throw new Error('Invalid Email / Password, please try again')
      }

      //Assign JWT to local storage once login successful
      localStorage.setItem('token', decodedResponse.token)
      //setState to login
      userLoginContext.setLoginState(true)
      SetLoginError(null)
      //redirect user to home page

      try {
        const showSuccessModal = await Swal.fire('Login Success')
        console.log(showSuccessModal)
        router.push('/')
      } catch (error: any) {
        console.log(error.message)
      }
    } catch (err: any) {
      try {
        const showErrorModel = await Swal.fire(`Error Code: ${loginError?.status} ${err.message}`)
      } catch (modalWindowError: any) {
        console.log('ErrorModalWindow Window Error: ' + modalWindowError.message)
      }
    }
  }

  return (
    <>
<div className="w-full h-screen-10 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
  <div className="w-full sm:max-w-md p-5 mx-auto">
      <h2 className="mb-12 text-center text-3xl font-semibold font-Lora">Welcome Back.</h2>
      <div className="mb-4">
        <label className="block mb-1 text-Montserrat">Email</label>
        <input value={login.email} onChange={handleEmailChange} className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full text-Montserrat"/>
        <label className="block mb-1">Password</label>
        <input value={login.password} type="password" onChange={handlePasswordChange} className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full text-Montserrat"/>
        <div className="mb-4">
          <br/>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-lightorange border border-transparent rounded-md font-semibold capitalize text-white hover:bg-white-700 active:bg-white-700 focus:outline-none focus:border-orange-700 focus:ring focus:ring-orange-200 disabled:opacity-25 transition text-Montserrat">
          Submit
        </button>
        </div>
      </div>
      <div className="text-Montserrat text-center mt-6">
      You don't have an account?
      <Link href="/signup">
        <a> <span className="underline">Sign up now.</span></a>
      </Link>
      </div>
      </div></div></>
  )
}

export default LoginForm

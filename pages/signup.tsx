import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

//To validate Email
function validateEmail(email: any) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const Signup: React.FC = () => {
    const router = useRouter()

    interface LoginDetails {
        username: strings
        email: string
        password: string
        walletAddress: string
        type: string
    }

    const [newAccount, setNewAccount] = useState<LoginDetails>({
        email: '',
        password: '',
        username: '',
        walletAddress: '',
        type: 'user',
    })
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
    const [isEmailEmpty, setEmailEmpty] = useState<boolean | null>(null)
    const [isUserNameEmpty, setUserNameEmpty] = useState<boolean | null>(null)
    const [isPasswordEmpty, setPasswordEmpty] = useState<boolean | null>(null)
    const [isWalletAddressEmpty, setWalletAddressEmpty] = useState<boolean | null>(null)
    const [isAllValid, setAllValid] = useState<boolean>(false)

    const emailInputRef = useRef<HTMLInputElement | undefined | null | any>()
    const passwordInputRef = useRef<HTMLInputElement | undefined | null | any>()
    const usernameInputRef = useRef<HTMLInputElement | undefined | null | any>()
    const walletAddressInputRef = useRef<HTMLInputElement | undefined | null | any>()

    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            email: event.currentTarget.value,
        })
    }

    const allValidCheck = (): void => {
        if (
            emailInputRef.current.value &&
            passwordInputRef.current.value &&
            usernameInputRef.current.value &&
            walletAddressInputRef.current.value
        ) {
            if (isEmailValid) {
                setAllValid(true)
            }
        } else {
            setAllValid(false)
        }
    }

    const onEmailBlur = (): void => {
        if (!emailInputRef.current.value) {
            setEmailEmpty(true)
        } else {
            const isValid = validateEmail(newAccount.email)
            setIsEmailValid(isValid)
            setEmailEmpty(false)
        }

        allValidCheck()
    }

    const onUserNameBlur = (): void => {
        if (!usernameInputRef.current.value) {
            setUserNameEmpty(true)
        } else {
            setUserNameEmpty(false)
        }
        console.log("this is username blur: ", isUserNameEmpty)
        allValidCheck()
    }

    const onPasswordBlur = (): void => {
        if (!passwordInputRef.current.value) {
            setPasswordEmpty(true)
        } else {
            setUserNameEmpty(false)
        }

        allValidCheck()
    }
    const onWalletAddressBlur = (): void => {
        if (!walletAddressInputRef.current.value) {
            setWalletAddressEmpty(true)
        } else {
            setUserNameEmpty(false)
        }

        allValidCheck()
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            password: event.currentTarget.value,
        })
    }

    const handleUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            username: event.currentTarget.value,
        })
    }

    const handleWalletAddressChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            walletAddress: event.currentTarget.value,
        });
    }

    const handleSubmit = async () => {
        //Create user Post request
        console.log(newAccount)
        const response = await fetch(`${process.env.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
        })

        let timerInterval: any
        await Swal.fire({
            title: 'Sign up success, redirecting to Login Page',
            html: 'Redirecting in <b></b> milliseconds.',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b: any = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        //redirect user to home page
        router.push('/login')
    }

    return (
        // <>
        //     <h1 className="text-center font-bold m-5">Sign Up For New Account</h1>
        //     <div className="flex flex-col text-center m-10">
        //         <label htmlFor="username" className="customLabel">
        //             Please key in a user name:
        //         </label>
        //         <input
        //             id="username"
        //             className="customInput"
        //             ref={usernameInputRef}
        //             value={newAccount.username}
        //             type="text"
        //             onChange={handleUserNameChange}
        //             onBlur={onUserNameBlur}
        //         />
        //         {isUserNameEmpty ? (
        //             <span className="font-bold text-red-600"> Please Fill in UserName</span>
        //         ) : (
        //             ''
        //         )}
        //         <label htmlFor="email" className="customLabel">
        //             Please key in a email:
        //         </label>
        //         <input
        //             id="email"
        //             className="customInput"
        //             ref={emailInputRef}
        //             value={newAccount.email}
        //             onChange={handleEmailChange}
        //             onBlur={onEmailBlur}
        //         />
        //         {isEmailValid == false ? (
        //             <span className="font-bold text-red-600">Invalid Email Format</span>
        //         ) : (
        //             ''
        //         )}
        //         {isEmailEmpty ? <span className="font-bold text-red-600">Please Fill in Email</span> : ''}
        //         <label className="customLabel">Please key in a password:</label>
        //         <input
        //             className="customInput"
        //             ref={passwordInputRef}
        //             value={newAccount.password}
        //             type="password"
        //             onChange={handlePasswordChange}
        //             onBlur={onPasswordBlur}
        //         />
        //         {isPasswordEmpty ? (
        //             <span className="font-bold text-red-600">Please Fill in Password</span>
        //         ) : (
        //             ''
        //         )}
        //         <label className="customLabel">Please key in your wallet address</label>
        //         <input
        //             className="customInput"
        //             ref={walletAddressInputRef}
        //             value={newAccount.walletAddress}
        //             type="text"
        //             onChange={handleWalletAddressChange}
        //             onBlur={onWalletAddressBlur}
        //         />
        //         {isWalletAddressEmpty ? (
        //             <span className="font-bold text-red-600">Please Fill in Wallet Address</span>
        //         ) : (
        //             ''
        //         )}

        //         <button
        //             disabled={!isAllValid}
        //             type="submit"
        //             onClick={handleSubmit}
        //             className="text-center m-10 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500">
        //             Confirm
        //         </button>
        //     </div>
        // </>
        <>
        <div className="w-full h-screen-10 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
          <div className="w-full sm:max-w-md p-5 mx-auto">
              <h2 className="mb-12 text-center text-3xl font-semibold font-Lora">Sign Up.</h2>
              <div className="mb-4 font-Montserrat">
        
                        <label htmlFor="username" className="block mb-1 font-Montserrat">
                            Username
                        </label>
                        <input
                            id="username"
        className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"                    ref={usernameInputRef}
                            value={newAccount.username}
                            type="text"
                            onChange={handleUserNameChange}
                            onBlur={onUserNameBlur}
                        />
                        {isUserNameEmpty ? (
                            <span className="font-bold text-red-600"> Please fill in Username</span>
                        ) : (
                            ''
                        )}
                        <label htmlFor="email" className="block mb-1 font-Montserrat">
                            Email
                        </label>
                        <input
                            id="email"
        className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"                    ref={emailInputRef}
                            value={newAccount.email}
                            onChange={handleEmailChange}
                            onBlur={onEmailBlur}
                        />
                        {isEmailValid == false ? (
                            <span className="font-bold text-red-600">Invalid Email format</span>
                        ) : (
                            ''
                        )}
                        {isEmailEmpty ? <span className="font-bold text-red-600">Please fill in Email</span> : ''}
                        <label className="block mb-1 font-Montserrat">Password</label>
                        <input
        className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"                    ref={passwordInputRef}
                            value={newAccount.password}
                            type="password"
                            onChange={handlePasswordChange}
                            onBlur={onPasswordBlur}
                        />
                        {isPasswordEmpty ? (
                            <span className="font-bold text-red-600">Please fill in Password</span>
                        ) : (
                            ''
                        )}
                        <label className="block mb-1 font-Montserrat">Metamask Wallet Address</label>
                        <input
        className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"                    ref={walletAddressInputRef}
                            value={newAccount.walletAddress}
                            type="text"
                            onChange={handleWalletAddressChange}
                            onBlur={onWalletAddressBlur}
                        />
                        {isWalletAddressEmpty ? (
                            <span className="font-bold text-red-600">Please fill in Metamask Wallet Address</span>
                        ) : (
                            ''
                        )}
                        <br/><br/>
                        <button
                            disabled={!isAllValid}
                            type="submit"
                            onClick={handleSubmit}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-lightorange border border-transparent rounded-md font-semibold capitalize text-white hover:bg-white-700 active:bg-white-700 focus:outline-none focus:border-orange-700 focus:ring focus:ring-orange-200 disabled:opacity-25 transition font-Montserrat">
                            Create Account
                        </button>
                    </div></div></div>
                </>
        
    )
}

export default Signup

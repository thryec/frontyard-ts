import React, { useState, useRef } from "react";
import { useRouter } from 'next/router';

//To validate Email
function validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Signup: React.FC = () => {

    const router = useRouter();

    interface LoginDetails {
        username: string;
        email: string;
        password: string;
        walletAddress: string;
        type: string;
    }

    const [newAccount, setNewAccount] = useState<LoginDetails>({ email: "", password: "", username: "", walletAddress: "", type: "user" });
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const [isEmailEmpty, setEmailEmpty] = useState<boolean | null>(null);
    const [isUserNameEmpty, setUserNameEmpty] = useState<boolean | null>(null);
    const [isPasswordEmpty, setPasswordEmpty] = useState<boolean | null>(null);
    const [isWalletAddressEmpty, setWalletAddressEmpty] = useState<boolean | null>(null);
    const [isAllValid, setAllValid] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement | undefined | null | any>();
    const passwordInputRef = useRef<HTMLInputElement | undefined | null | any>();
    const usernameInputRef = useRef<HTMLInputElement | undefined | null | any>();
    const walletAddressInputRef = useRef<HTMLInputElement | undefined | null | any>();


    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            email: event.currentTarget.value
        });
    }

    const allValidCheck = (): void => {
        if (emailInputRef && passwordInputRef && usernameInputRef && walletAddressInputRef) {
            setAllValid(true);
        } else {
            setAllValid(false);
        }
    }

    const onEmailBlur = (): void => {
        if (!emailInputRef.current.value) {
            setEmailEmpty(true);
        } else {
            const isValid = validateEmail(newAccount.email);
            setIsEmailValid(isValid);
            setEmailEmpty(false);
        }

        allValidCheck();
    }

    const onUserNameBlur = (): void => {
        if (!usernameInputRef.current.value) {
            setUserNameEmpty(true);
        } else {
            setUserNameEmpty(false);
        }

        allValidCheck();
    }

    const onPasswordBlur = (): void => {
        if (!passwordInputRef.current.value) {
            setPasswordEmpty(true);
        } else {
            setUserNameEmpty(false);
        }

        allValidCheck();
    }
    const onWalletAddressBlur = (): void => {
        if (!walletAddressInputRef.current.value) {
            setWalletAddressEmpty(true);
        } else {
            setUserNameEmpty(false);
        }

        allValidCheck();
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            password: event.currentTarget.value
        });
    }

    const handleUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            username: event.currentTarget.value
        });
    }

    const handleWalletAddressChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            walletAddress: event.currentTarget.value
        });
    }

    const handleSubmit = async () => {
        //Create user Post request
        console.log(newAccount);
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccount),
        });

        //redirect user to home page
        router.push('/login');

    }

    return (<>
        <h1 className="text-center font-bold m-5">Sign Up For New Account</h1>
        <div className="flex flex-col text-center m-10">
            <label htmlFor="username" className="customLabel">Please key in a user name:</label>
            <input id="username" className="customInput" ref={usernameInputRef} value={newAccount.username} type="text" onChange={handleUserNameChange} onBlur={onUserNameBlur} />
            {isUserNameEmpty ? <span>Please Fill in UserName</span> : ""}
            <label htmlFor="email" className="customLabel">Please key in a email:</label>
            <input id="email" className="customInput" ref={emailInputRef} value={newAccount.email} onChange={handleEmailChange} onBlur={onEmailBlur} />
            {isEmailValid == false ? <span>Invalid Email Format</span> : ""}
            {isEmailEmpty ? <span>Please Fill in Email</span> : ""}
            <label className="customLabel" >Please key in a password:</label>
            <input className="customInput" ref={passwordInputRef} value={newAccount.password} type="password" onChange={handlePasswordChange} onBlur={onPasswordBlur} />
            {isPasswordEmpty ? <span>Please Fill in Password</span> : ""}
            <label className="customLabel">Please key in your wallet address</label>
            <input className="customInput" ref={walletAddressInputRef} value={newAccount.walletAddress} type="text" onChange={handleWalletAddressChange} onBlur={onWalletAddressBlur} />
            {isWalletAddressEmpty ? <span>Please Fill in Wallet Address</span> : ""}

            <button
                disabled={!isAllValid}
                type="submit"
                onClick={handleSubmit}
                className="text-center m-10 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Confirm
            </button>

        </div>
    </>)
};

export default Signup;
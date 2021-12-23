import React, { useState } from "react";
import { useRouter } from 'next/router';

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

    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewAccount({
            ...newAccount,
            email: event.currentTarget.value
        });
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

        //Login Post request
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
        <h1>Sign Up For New Account</h1>
        <div className="flex flex-col text-center">
            <div className="mb-6">
                <label htmlFor="username" className="customLabel">Please key in a user name:</label>
                <input id="username" className="customInput" value={newAccount.username} type="text" onChange={handleUserNameChange} />
            </div>
            <label htmlFor="email" className="customLabel">Please key in a email:</label>
            <input id="email" className="customInput" value={newAccount.email} onChange={handleEmailChange} />
            <label className="customLabel" >Please key in a password:</label>
            <input className="customInput" value={newAccount.password} type="password" onChange={handlePasswordChange} />
            <label className="customLabel">Please key in your wallet address</label>
            <input className="customInput" value={newAccount.walletAddress} type="text" onChange={handleWalletAddressChange} />
        </div>
        <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Confirm
        </button>
        <input className="customBtn" type="submit" onClick={handleSubmit} />
    </>)
};

export default Signup;
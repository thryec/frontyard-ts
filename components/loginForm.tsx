import React, { useState } from 'react'
import { useRouter } from 'next/router'

const LoginForm: React.FC = () => {

    const router = useRouter();

    interface LoginDetails {
        email: string;
        password: string;
    }

    const [login, setLogin] = useState<LoginDetails>({ email: "", password: "" });

    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            email: event.currentTarget.value
        });
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            password: event.currentTarget.value
        });
    }

    const handleSubmit = async () => {

        //Login Post request
        const response = await fetch('http://localhost:3001/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        });

        console.log(response);
        console.log("Login Request Response Status: ", response.status);

        //Assign JWT to local storage once login successful
        const decodedResponse = await response.json();
        localStorage.setItem('token', decodedResponse.token);


        //redirect user to home page
        router.push('/');


    }

    return (<>
        <h1>Login Page</h1>
        <label>Email:</label>
        <input value={login.email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input value={login.password} type="password" onChange={handlePasswordChange} />
        <input type="submit" onClick={handleSubmit} />
    </>)
};

export default LoginForm;
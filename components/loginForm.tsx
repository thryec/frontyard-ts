import React, { useState } from 'react'

const LoginForm = () => {

    const [login, setLogin] = useState({ email: '', password: '' });
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [errorCode, setErrorCode] = useState();

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
        const response = await fetch('http://localhost:3001/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        });

        console.log(response.status);
        const decodedResponse = await response.json();
        localStorage.setItem('token', decodedResponse.token);

    }

    return (<>
        <h1>Login Page</h1>
        <label>Email:</label>
        <input value={login.email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input value={login.password} type="password" onChange={handlePasswordChange} />
        <input className="mt-1 relative rounded-md shadow-sm" type="submit" onClick={handleSubmit} />
        {loginSuccessful ? "uwu" : ""}
    </>)
};

export default LoginForm;
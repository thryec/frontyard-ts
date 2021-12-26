import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/LoginState'

const LoginForm: React.FC = () => {

  const router = useRouter();
  const userLoginContext = useContext(UserContext);

  interface LoginDetails {
    email: string;
    password: string;
  }

  interface ErrorLog {
    status: number;
    message: string;
  }

  const [login, setLogin] = useState<LoginDetails>({ email: "", password: "" });
  const [loginError, SetLoginError] = useState<ErrorLog | null>(null);

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
    try {
      //Login Post request
      const response = await fetch('http://localhost:3001/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login),
      });

      const decodedResponse = await response.json();

      if (decodedResponse.status === 401) {
        SetLoginError({
          status: decodedResponse.status,
          message: decodedResponse.message
        });
        throw new Error("Invalid Email / Password, please try again");
      }
      //Assign JWT to local storage once login successful
      localStorage.setItem('token', decodedResponse.token);
      //setState to login
      userLoginContext.setLoginState(true);
      SetLoginError(null);
      //redirect user to home page
      router.push('/');

    } catch (err: any) {
      console.log(err.message);
    }


  }

  return (<>
    <h1>Login Page</h1>
    <label>Email:</label>
    <input value={login.email} onChange={handleEmailChange} />
    <label>Password:</label>
    <input value={login.password} type="password" onChange={handlePasswordChange} />
    <input type="submit" onClick={handleSubmit} />
    {loginError ? `Error: ${loginError.status} ${loginError.message}` : ""}
  </>)
};

export default LoginForm;
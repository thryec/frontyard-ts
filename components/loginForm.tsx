import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/LoginState'
import Swal from 'sweetalert2';

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

      try {
        const showSuccessModal = await Swal.fire("Login Success");
        console.log(showSuccessModal);

        router.push('/');
      } catch (error: any) {
        console.log(error.message);
      }

    } catch (err: any) {
      try {
        const showErrorModel = await Swal.fire(`Error Code: ${loginError?.status} ${err.message}`);
      } catch (modalWindowError: any) {
        console.log("ErrorModalWindow Window Error: " + modalWindowError.message);
      }
    }
  }

  return (<>
    <h1 className="text-center font-bold m-5">Login Page</h1>
    <div className="flex flex-col text-center m-10">
      <label>Email:</label>
      <input value={login.email} onChange={handleEmailChange} />
      <label>Password:</label>
      <input value={login.password} type="password" onChange={handlePasswordChange} />
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-center m-10 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </div>
  </>)
};

export default LoginForm;
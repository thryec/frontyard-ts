import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../context/LoginState';
import Router, { useRouter } from 'next/router'

const Users: React.FC = () => {

    const userDetails = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    let token: any = "";
    let requestHeaders: any = {}

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'GET',
                headers: requestHeaders
            });
            if (response.status === 401) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            } else {
                const users = await response.json();
                console.log(users);
                setUserList(users);
            }

        } catch (error: any) {
            setErrorMessage(`Users Fetch Error: ${error.message}`);
            console.log(errorMessage);
        }
    }

    useEffect(() => {
        if (!userDetails.isLoggedIn) {
            console.log("User is Logged in: " + userDetails.isLoggedIn);
            console.log("rerouting user to login page");
            router.push('/login');
        }

        token = localStorage.getItem('token');
        requestHeaders = {
            'Content-Type': 'application/json',
            'token': token
        }

        fetchUsers();
    }, []);

    const renderUsers = userList.map((user: any) => {
        return (<p>{`${user.username}`}</p>);
    })

    return (
        <div className="flex flex-col justify-center content-center">
            <h1>User Management</h1>
            <p> Test </p>
            {
                userList.length !== 0 ? renderUsers : errorMessage || "Loading User List, please wait"
            }
        </div>
    );
}

export default Users
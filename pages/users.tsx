import React, { useEffect, useState, useContext, useRef } from 'react'
import UserContext from '../context/LoginState';
import Router, { useRouter } from 'next/router'

const Users: React.FC = () => {

    const userRef: any = useRef([]);
    const [triggerReRender, setTriggerReRender] = useState(false);
    const userDetails = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState<String | null>("");
    const router = useRouter();

    // let token: any = "";
    let requestHeaders: any = {}

    async function fetchUsers() {
        try {

            const retrieveToken = localStorage.getItem('token');
            setToken(retrieveToken);
            console.log("Current Token is: ");
            console.log(retrieveToken);
            requestHeaders = {
                'Content-Type': 'application/json',
                'token': retrieveToken
            }
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

    const handleDeleteButton: any = async (index: any) => {
        try {
            console.log("User ID: " + userRef.current[index]);
            const response = await fetch(`http://localhost:3001/users/${userRef.current[index]}`, {
                method: "DELETE",
                headers: requestHeaders
            }); //delete

            if (response.status === 401) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            if (response.status === 200) {
                //set it opposite to toggle rerender
                setTriggerReRender(!triggerReRender);
                console.log("successful uwu");
            }

        } catch (error: any) {
            console.log("Delete request: " + error.message);
        }
    }

    useEffect(() => {
        if (!userDetails.isLoggedIn) {
            console.log("User is Logged in: " + userDetails.isLoggedIn);
            console.log("rerouting user to login page");
            router.push('/login');
        }

        fetchUsers();


    }, [triggerReRender]);

    const renderUsers = userList.map((user: any, index) => {
        return (
            <tbody>
                <tr>
                    <td ref={ref => { userRef.current[index] = user._id }} >{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.walletAddress}</td>
                    <td>
                        <button onClick={handleDeleteButton.bind(null, index)}>
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    })

    return (
        <div className="flex flex-col justify-center content-center">
            <h1>User Management</h1>

            {
                userList.length !== 0 ? <table className='table-auto'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>WalletAddress</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {renderUsers}
                </table> : errorMessage || "Loading User List, please wait"
            }
        </div>
    );
}

export default Users
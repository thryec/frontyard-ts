import React, { createContext } from 'react';

interface UserLoginStatus {
    isLoggedIn: boolean,
    setLoginState(state: boolean): void
}

const userDefaultValue = {
    isLoggedIn: false,
    setLoginState: (state: boolean) => "uwu"
}

const UserContext = createContext<UserLoginStatus>(userDefaultValue);

export default UserContext;



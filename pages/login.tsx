import LoginForm from "../components/loginForm";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/LoginState";

const Login: React.FC = () => {

    const userContext = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        console.log("UseEffect in Login.tsx is triggered, checking for local Storage token");
        let token = localStorage.getItem('token');
        if (token) {
            console.log("Login.tsx: User is logged in, rerouting user away from login page")
            userContext.setLoginState(true);
            router.push('/');
        }
    }, []);

    return (<>
        <LoginForm />
    </>)
};

export default Login;
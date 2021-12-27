import LoginForm from "../components/loginForm";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/LoginState";

const Login: React.FC = () => {

    const userContext = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (userContext.isLoggedIn) {
            console.log("Inside Login tsx: checking for user login state");
            router.push('/');
        }
    }, []);

    return (<>
        <LoginForm />
    </>)
};

export default Login;
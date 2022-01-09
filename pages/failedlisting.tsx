import Link from 'next/link'
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../context/LoginState'

const Failed = () => {
    const userLoginState = useContext(UserContext)
    const router = useRouter();
    
  if (userLoginState.isLoggedIn === false) {
    router.push('/404');
    return;
}
    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }, [])

    return (
        <div>
            <h1>Error, failed to list item. Try again later.</h1>
            <h2>Go back to <Link href='/'><a>backyard</a></Link></h2>
        </div>
    )
}

export default Failed;
import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Failed = () => {
    const router = useRouter();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) {
        router.push('/404');
        return;
    }
    },[])

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }, [])

    return (
        <div>
            <h1>Server error, please try again later.</h1>
            <h2>Go back to <Link href='/'><a>backyard</a></Link></h2>
        </div>
    )
}

export default Failed;
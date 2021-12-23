import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }, [])

    return (
        <div>
            <h1>Wrong door!</h1>
            <h2>Go back to <Link href='/'><a>backdoor</a></Link></h2>
        </div>
    )
}

export default NotFound;
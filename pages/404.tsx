import Link from 'next/link'

const NotFound = () => {
    return (
        <div>
            <h1>Wrong door!</h1>
            <h2>Go back to <Link href='/'><a>backdoor</a></Link></h2>
        </div>
    )
}

export default NotFound;
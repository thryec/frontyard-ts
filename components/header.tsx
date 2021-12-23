import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import Image from 'next/image';

const Header = () => {
    return (<header className='h-10 bg-lightgrey'>
      <div className="logo">
      <Link href="/">
        <a className="mr-10">
          <Image src="/backdoor.png" width={100} height={50}/>
        </a>
      </Link>
      </div>
      <nav>
        <Link href="/items">
          <a className="mr-10 text-dullred">All Items</a>
        </Link>
        <Link href="/signup">
          <a className="mr-10">Sign Up</a>
        </Link>
        <Link href="/login">
          <a className="mr-10">Login</a>
        </Link>
        <Link href="/listItem">
          <a className="mr-10">Sell</a>
        </Link>
      </nav>
    </header>)
};

export default Header;
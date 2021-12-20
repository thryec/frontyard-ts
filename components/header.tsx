// import '../styles/globals.css'
// import 'tailwindcss/tailwind.css'
import Link from 'next/link'

const Header = () => {
  return (<header>
    <div className="logo">
      <Link href="/">
        <a className="mr-10">
          <img src="/backdoor.png" />
        </a>
      </Link>
    </div>
    <nav>
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
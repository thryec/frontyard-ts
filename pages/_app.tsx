import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="m-10">
        <Link href="/">
          <a className="mr-10">🚪 Backdoor</a>
        </Link>
        <Link href="/listItem">
          <a className="mr-10">🎨 List Item</a>
        </Link>
        <Link href="/favourites">
          <a className="mr-10">💙 Favourites</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="m-8 flex justify-center">
        <Link href="/">
          <a className="mr-10">🚪 Backdoor</a>
        </Link>
        <Link href="/listItem">
          <a className="mr-10">🎨 List Item</a>
        </Link>
        <Link href="/favourites">
          <a className="mr-10">💙 Favourites</a>
        </Link>
        <form
          action=""
          className="flex justify-start bg-white rounded-xl border-2 overflow-hidden w-1/6">
          <input
            type="search"
            placeholder="Search..."
            className="block rounded-md border-0 focus:outline-none focus:ring-0 focus:border-black-500 flex-grow p-2"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 my-auto m-2"
              style={{ color: 'gray' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

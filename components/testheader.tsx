import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import SearchBar from './searchbar'

const TestHeader = () => {

return (
    <>
    <header className="bg-white shadow-lg h-24 hidden md:flex">
  <div className="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8">
        <Link href="/">
          <a>
            <h1 className='font-LogoFont font-semibold tracking-wider text-4xl text-mblue'>backyard.</h1>
          </a>
        </Link>  </div>
  <div className="flex items-center font-semibold text-base lg:text-lg  ml-4 xl:ml-8 mr-auto">
    {/* <div className=""> */}
        <SearchBar/>
    {/* </div> */}
  </div>
  <div className="flex items-center px-4 lg:px-6 xl:px-8">
        <Link href="/sell">
              <a className="mr-10 text-white text-lg font-Montserrat text-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-lightorange hover:bg-brightorange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brightorange-500">Sell</a>
        </Link>
        <Link href="/items">
          <a className="mr-10 text-white text-lg font-Montserrat text-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-lightorange hover:bg-brightorange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brightorange-500">
            Buy
          </a>
        </Link>

{/* <div className="p-4"> */}
    <div className="group relative">
        <button className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/></svg>
        </button>
        <nav className="border border-2 bg-white invisible border-gray-800 rounded w-60 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
            <ul className="py-1">
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Edit
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Delete
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Reply
                    </a>
                </li>
            </ul>
        </nav>
    </div>
{/* </div> */}
















    </div>
</header>
    </>
)
}
export default TestHeader
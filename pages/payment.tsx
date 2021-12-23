import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const Payment: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-slate-200 m-10 p-10 w-1/2 border rounded-md shadow border-gray-300 flex justify-center">
        <Image src="/../public/check.png" alt="check" width="100px" height="100px" />
        Thank you for your purchase!
        <Link href="/">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Payment

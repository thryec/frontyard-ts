import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const Payment: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-slate-200 m-10 p-10 w-1/2 border rounded-md shadow border-gray-300">
        <div className="flex justify-center mt-3 mb-5">
          <Image src="/../public/check.png" alt="check" width="100px" height="100px" />
        </div>
        <div className="flex justify-center mt-3 mb-3">Thank you for your purchase!</div>
        <div className="flex justify-center mt-3 mb-3">
          <Link href="/">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Payment

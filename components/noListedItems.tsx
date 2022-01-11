import Link from 'next/link';

const NoListedItems = (props:any) => {

    return (
      <div className="flex justify-center">
        <div className="p-5 bg-slate-200 border rounded-md w-1/3">
          <div className="flex justify-center mb-5">No listed items found. Start selling now:</div>
          <div className="flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2">
              <Link href="/sell">Sell</Link>
            </button>
          </div>
        </div>
      </div>
    )

}

export default NoListedItems
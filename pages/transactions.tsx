import type { NextPage } from 'next'

const Transactions: NextPage = () => {
  return (
    <div>
      <div className="flex justify-center m-5">
        <h1 className="text-2xl underline underline-offset-8">Transaction History</h1>
      </div>
      <div className="flex justify-center">
        <div className="m-5 w-1/3 flex justify-center">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">
            Items Purchased
          </h1>
        </div>
        <div className="border-double border-l-4 border-slate-500"></div>
        <div className="m-5 w-1/3 flex justify-center">
          <h1 className="text-xl underline underline-offset-8 decoration-dotted">Items Sold</h1>
        </div>
      </div>
    </div>
  )
}

export default Transactions

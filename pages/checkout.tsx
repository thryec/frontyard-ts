import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

interface itemProps {
  name: string
  description: string
  _id: string
  image: string
  price: number
  quantity: number
  listingEndDate: Date
  ListingStartDate: Date
}

const Checkout: NextPage<itemProps> = ({ query }: any) => {
  console.log('checkout item: ', query)
  // const { name } = props
  return (
    <div className="ml-10">
      Checkout Here
      <div>{query}</div>
    </div>
  )
}

export default Checkout

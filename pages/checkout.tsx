import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

interface Props {
  name: String
}

const Checkout: NextPage<Props> = (props) => {
  console.log('checkout item: ', props)
  const { name } = props
  return (
    <div className="ml-10">
      Checkout Here
      <div>{name}</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context query: ', context.query)
  return {
    props: {},
  }
}

export default Checkout

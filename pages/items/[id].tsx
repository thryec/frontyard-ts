import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// export const getStaticPaths = async () => {
//     const res = await fetch('http://localhost:4000/items');
//     const data = await res.json();

//     const paths = data.map(item => {
//         return {
//             params: {id: item['name'].toString()}
//         }
//     })

//     return {
//         paths: paths,
//         fallback: false
//     }
// }

// export const getStaticProps = async (context) => {
//     const id = context.params.id;
//     const res = fetch('http://localhost:4000/items/' + id);
//     const data = await res.json();

//     return {
//         props: {item: data}
//     }
// }

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

const Details = () => {
  const [currentItem, setCurrentItem] = useState<any>()
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const router = useRouter()
  const { id } = router.query

  const fetchItemDetails = async () => {
    try {
      const res = await fetch(`http://localhost:4000/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setCurrentItem(data)
      setIsLoaded(true)
      console.log('sent database txn: ', data)
    } catch (err) {
      console.log('error fetching transactions: ', err)
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchItemDetails()
    }
  }, [id])

  return (
    <div>
      {isLoaded ? (
        <div>
          <Link href={'/checkout/' + currentItem._id}>Buy</Link>
          {/* <Link href="/checkout">Buy</Link> */}
          Details card
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  )
}

export default Details

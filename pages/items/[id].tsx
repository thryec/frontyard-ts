import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image';

// export const getStaticPaths = async () => {
//     const res = await fetch(`${process.env.API_ENDPOINT}/items`);
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
//     const res = fetch(`${process.env.API_ENDPOINT}/items/` + id);
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
      const res = await fetch(`${process.env.API_ENDPOINT}/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setCurrentItem(data)
      setIsLoaded(true)
      console.log('item data: ', data)
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
          <Image src={currentItem.image} width="200px" height="200px"/>
          <h1>Listing Title: {currentItem.name}</h1>
          <h1>Description: {currentItem.description}</h1>
          <h1>Price: {currentItem.price} ETH</h1>
          <Link href={'/checkout/' + currentItem._id}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
              Buy
            </button>
          </Link>
          <Link href={'/items'}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white border rounded-md p-2 m-2">
              Back to Item Listing
            </button>
          </Link>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  )
}

export default Details

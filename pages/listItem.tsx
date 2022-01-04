import React, {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
// import Items from './items';



//to validate price is an integer
// const validatePrice: any = () => {

// }

//uncontrolled
const List = () => {
  const router = useRouter()
  // const { id } = router.query

  const [listSuccess, setListSuccess] = useState<Boolean | null>();
  const refName = useRef<any>();
  const refDescription = useRef<any>();
  const refImage = useRef<any>();
  const refPrice = useRef<any>();
  const refSeller = useRef<any>();

  // const [saveName, setSaveName] = useState<any>();
  const [] = useState<any>();
  const [] = useState<any>();
  const [] = useState<any>();
  const [] = useState<any>();

  //handle on blur

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newItem = {
      name : refName.current.value,
      description : refDescription.current.value,
      image : refImage.current.value,
      price : refPrice.current.value,
      seller : refSeller.current.value,
    }
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const x : any = await res.json();
      setListSuccess(true);
      // redirectPage();
      // console.log("id " + id);
      router.push(`/items/${x._id}`);
    } catch (err) {
      setListSuccess(false);
      console.log(listSuccess)
      console.log(err);
    }
  }

            // // //redirect if successful
            // if (listSuccess === true) {
            //   useEffect(() => {
            //     setTimeout(() => {
            //       const router = useRouter();
            //         router.push('/items'+{id});
            //     }, 3000)
            // }, [listSuccess])
            // }
            
  // const redirectPage = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.API_ENDPOINT}/items`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     const data = await res.json();
  //     console.log('new data', data.body)
  //     //redirect if successful
  //     //   useEffect(() => {
  //     //     setTimeout(() => {
  //     //       const router = useRouter();
  //     //         router.push('/items/:id');
  //     //     }, 3000)
  //     // }, [])
  //   } catch (err) {
  //     console.log('error fetching items: ', err)
  //   }
  // }

  // const loadData = async () => {
  //   const res = await fetch(`${process.env.API_ENDPOINT}/items/listed`)
  //   if (res.status !== 200) {
  //     console.error('Failed to fetch items')
  //     return
  //   }
  //   const data = await res.json()
  //   console.log('fetched data: ', data)
  // }

  // interface itemProps {
  //   name: string
  //   description: string
  //   _id: string
  //   image: string
  //   price: number
  //   quantity: number
  //   listingEndDate: Date
  //   ListingStartDate: Date
  // }



  return (
    <>
      <h1 className="ml-10">List Item Here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Listing Title: </label>
        <input type="text" name="name" ref={refName}></input><br/>
        <label htmlFor='description'>Description: </label>
        <input type="text" name="description" ref={refDescription}></input><br/>
        <label htmlFor='image'>Image URL: </label>
        <input type="text" name="image" ref={refImage}></input><br/>
        <label htmlFor='price'>Price (ETH): </label>
        <input type="text" name="price" ref={refPrice}></input><br/>
        <label htmlFor='seller'>Seller: </label>
        <input type="text" name="seller" ref={refSeller}></input><br/>
        {/* <input type="file" name="image" id="image" accept=".png, .jpg, .jpeg, image/*" ref={refImage}/> */}
        <input type="submit" value="List Item"/>
      </form>
      {listSuccess ? <h1>listing successful</h1> : <h1>listing unsuccessful, please try again</h1>}
    </>
  )
}

export default List

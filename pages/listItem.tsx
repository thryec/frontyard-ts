import React, {useState, useRef} from 'react';
import { useRouter } from 'next/router'

//uncontrolled
const List = () => {
  const router = useRouter()

  const refName = useRef<any>();
  const refDescription = useRef<any>();
  const refImage = useRef<any>();
  const refPrice = useRef<any>();
  const refSeller = useRef<any>();

  const [] = useState<any>();
  const [] = useState<any>();
  const [] = useState<any>();
  const [] = useState<any>();

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
      router.push(`/items/${x._id}`);
    } catch (err) {
      console.log(err);
    }
  }
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
        <input type="submit" value="List Item"/>
      </form>
    </>
  )
}

export default List

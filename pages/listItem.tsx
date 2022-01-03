import React, {useState, useRef} from 'react';
//uncontrolled
const List = () => {
  // const [listSuccess, setListSuccess] = useState<Boolean>(true);
  const refName = useRef<any>();
  const refDescription = useRef<any>();
  const refImage = useRef<any>();
  const refPrice = useRef<any>();
  const refSeller = useRef<any>();

  const handleSubmit = async () => {
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
      // setListSuccess(true);
    } catch (err) {
      console.log(err);
      // setListSuccess(false);
    }
  }
  console.log("name"+refName)
  return (
    <>
      <h1 className="ml-10">List Item Here</h1>
      <form onSubmit={handleSubmit}>
        Listing Title: <input type="text" name="name" ref={refName}></input><br/>
        Description: <input type="text" name="description" ref={refDescription}></input><br/>
        Image URL: <input type="text" name="description" ref={refImage}></input><br/>
        Price: <input type="text" name="price" ref={refPrice}></input><br/>
        Seller: <input type="text" name="seller" ref={refSeller}></input><br/>
        {/* <input type="file" name="image" id="image" accept=".png, .jpg, .jpeg, image/*" ref={refImage}/> */}
        <input type="submit" value="List Item"/>
      </form>
    </>
  )
}

export default List

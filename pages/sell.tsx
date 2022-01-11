import React, { useState, useContext, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/LoginState'
import NotLoggedIn from '../components/userNotLoggedin'
import jwtDecode from 'jwt-decode'
import { create } from 'ipfs-http-client'

const url: string | any = 'https://ipfs.infura.io:5001/api/v0'
const client = create(url)

const Sell = () => {
  const router = useRouter()
  const userLoginState = useContext(UserContext)
  const refName = useRef<any>()
  const refDescription = useRef<any>()
  const refImage = useRef<any>()
  const refPrice = useRef<any>()
  const [input, setInput] = useState<any>({
    name: '',
    description: '',
    image: '',
    price: 0,
  })
  const [nameEmpty, setNameEmpty] = useState<boolean | null>(null)
  const [descriptionEmpty, setDescriptionEmpty] = useState<boolean | null>(null)
  const [imageEmpty, setImageEmpty] = useState<boolean | null>(null)
  const [priceEmpty, setPriceEmpty] = useState<boolean | null>(null)
  const [fileUrl, setFileUrl] = useState('')
  const [fileUploading, setFileUploading] = useState(false)

  const onFileUpload = async (e: any) => {
    setFileUploading(true)
    const file = e.target.files[0]
    try {
      const addedFile = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${addedFile.path}`
      console.log('ipfs url: ', url)
      setFileUrl(url)
      setFileUploading(false)
      setImageEmpty(false)
    } catch (e) {
      router.push('/failedlisting')
      console.log('Error uploading file: ', e)
    }
  }

  const handleChange = (event: any) => {
    const label = event.target.name
    const value = event.target.value
    setInput({ ...input, [label]: value })
    // console.log("this is the input: ", input)
  }

  //check if price input is a number within 123456.1234 format
  const verifyPrice = () => {
    const re = /^\d{0,6}(\.\d{1,4})?$/
    const isNumber = re.test(input.price)
    return isNumber
  }

  ////to check if fields are empty
  const handleNameBlur = (): void => {
    !refName.current.value ? setNameEmpty(true) : setNameEmpty(false)
    // console.log("this is nameblur: ", nameEmpty)
  }
  const handleDescriptionBlur = (): void => {
    !refDescription.current.value ? setDescriptionEmpty(true) : setDescriptionEmpty(false)
    // console.log("this is descpblur: ", descriptionEmpty)
  }
  const handleImageBlur = (): void => {
    !fileUrl ? setImageEmpty(true) : setImageEmpty(false)
    // console.log("this is imageblur: ", imageEmpty)
  }
  const handlePriceBlur = (): void => {
    !refPrice.current.value ? setPriceEmpty(true) : setPriceEmpty(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let token: string | null = localStorage.getItem('token')
    if (input.name && input.description && fileUrl && input.price && verifyPrice() && token) {
      let decodedToken: any = jwtDecode(token)
      let sellerWallet = decodedToken.walletAddress
      let newItem = { ...input, seller: sellerWallet, image: fileUrl }

      try {
        const res = await fetch(`${process.env.API_ENDPOINT}/items`, {
          method: 'POST',
          body: JSON.stringify(newItem),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data: any = await res.json()
        router.push(`/items/${data._id}`)
      } catch (err) {
        console.log(err)
        router.push('/failedlisting')
      }
    } else {
      console.log('error')
      router.push('/failedlisting')
    }
  }

  // useEffect(() => {
  //   renderImage()
  // }, fileUrl)

  return (
    <>
      {userLoginState.isLoggedIn ? (
        <div className="font-Montserrat">
          <div className="flex flex-wrap w-full mb-8 ml-10">
            <div className="w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900 font-Lora">
                List Your Items
              </h1>
              <div className="h-1 w-20 bg-forestgreen rounded"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="block mb-1 font-Montserrat">
                Listing Title:{' '}
              </label>
              <input
                type="text"
                name="name"
                ref={refName}
                onChange={handleChange}
                onBlur={handleNameBlur}
                className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"></input>
              {nameEmpty ? <><span className="font-bold text-red-600">Please enter listing title</span><br/></> : ''}
              <br />
              <label htmlFor="description" className="block mb-1 font-Montserrat">
                Description:{' '}
              </label>
              <input
                type="text"
                name="description"
                ref={refDescription}
                onChange={handleChange}
                onBlur={handleDescriptionBlur}
                className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"></input>
              {descriptionEmpty ? <><span className="font-bold text-red-600">Please enter listing description</span><br/></>: ''}
              <br />
              <label htmlFor="image" className="block mb-1 font-Montserrat">
                Image URL:{' '}
              </label>
              <input
                type="file"
                onChange={onFileUpload}
                onClick={handleImageBlur}
                className="mb-4 text-lg font-Montserrat text-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md"
              />
              {fileUploading ? (
                <div className="font-Montserrat">Loading...</div>
              ) : (
                <img src={fileUrl} width="400px" />
              )}
              {/* <input
                type="text"
                name="image"
                ref={refImage}
                onChange={handleChange}
                onBlur={handleImageBlur}
                className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"></input> */}
              {imageEmpty ? <><span className="font-bold text-red-600">Please upload listing image</span><br/></> : ''}
              <br />
              <label htmlFor="price" className="block mb-1 font-Montserrat">
                Price (ETH):{' '}
              </label>
              <input
                type="text"
                name="price"
                ref={refPrice}
                onChange={handleChange}
                onBlur={handlePriceBlur}
                className="py-2 px-3 border border-gray-300 focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full font-Montserrat"></input>
              {priceEmpty ? <><span className="font-bold text-red-600">Please enter listing price</span><br/></> : ''}
              {verifyPrice() ? true : <><span className="font-bold text-red-600">Please enter price in numbers</span><br/></>}
              <br/>
              <input
                type="submit"
                value="List Item"
                className='mr-10 text-white text-lg font-Montserrat text-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-lightorange hover:bg-brightorange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brightorange-500"'
              />
            </form>
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </>
  )
}

export default Sell

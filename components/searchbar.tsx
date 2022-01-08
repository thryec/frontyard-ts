import 'tailwindcss/tailwind.css'
import { Autocomplete, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SearchBar = () => {
  const [itemList, setItemList] = useState<Array<any>>([])
  const [value, setValue] = useState<any>('Enter Item name')
  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  const getItemList = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/items/listed`)
      if (!res) {
        throw new Error('Fetching of Item list failed')
      }
      const data = await res.json()
      if (!data) {
        throw new Error('Converting of Data failed')
      }
      console.log('data: ', data)
      let tempArray: any = []
      data.map((item: any) => {
        tempArray.push({ label: item.name, id: item._id })
      })

      setItemList(tempArray)
      console.log('Item List: ', itemList)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleSearch = () => {
    console.log(value)
    router.push(`/items/${value.id}`)
  }

  useEffect(() => {
    getItemList()
  }, [])

    return (<>
        <div className='flex'>
            <Autocomplete
                // disablePortal
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="combo-box-demo"
                options={itemList ? itemList : []}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search for Items" />}
            />
            <button className="align-middle items-center content-center"
                            disabled={!value}
                            type="submit"
                            onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg"  height="36px" viewBox="0 0 36 36" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </button>
            {/* <button
                disabled={!value}
                type="submit"
                onClick={handleSearch}
                className="text-center ml-5 mt-2 mb-10 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search
            </button> */}
        </div>
    </>)

}

export default SearchBar

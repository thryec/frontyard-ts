
import 'tailwindcss/tailwind.css'
import { Autocomplete, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SearchBar = () => {
    const [itemList, setItemList] = useState<Array<any>>([]);
    const [value, setValue] = useState("uwu");
    const [inputValue, setInputValue] = useState('');

    const router = useRouter();

    const getItemList = async () => {
        try {
            const res = await fetch(`${process.env.API_ENDPOINT}/items/listed`);
            if (!res) {
                throw new Error("Fetching of Item list failed");
            }
            const data = await res.json();
            if (!data) {
                throw new Error("Converting of Data failed");
            }
            console.log("data: ", data);
            let tempArray: any = [];
            data.map((item: any) => {
                tempArray.push({ label: item.name, id: item._id });
            })

            setItemList(tempArray);
            console.log("Item List: ", itemList);
        } catch (error: any) {
            console.log(error.message);
        }

    }

    const handleSearch = () => {
        console.log(value);
        router.push(`/items/${value.id}`);
    }

    useEffect(() => {
        getItemList();
    }, []);

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
            <button
                disabled={!value}
                type="submit"
                onClick={handleSearch}
                className="text-center m-10 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search
            </button>
        </div>
    </>)
}

export default SearchBar;
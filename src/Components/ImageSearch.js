import React, {useState, useEffect} from "react";
import axios from "axios";

// console.log("ImageSearch.js", process.env.REACT_APP_UNSPLASH_ACCESS_KEY);   // process is a global variable. It can be accessed from any file. And in order to access it, we need to restart the application
const ImageSearch=({setImageList})=>{
    const [searchQuery, setSearchQuery] =useState("")
    
    useEffect(()=>{
        handleSearch()
    }, [])

    function handleSearch(e){
        if(e) e.preventDefault();  // if e exists
        // console.log(searchQuery);

        axios.get("https://api.unsplash.com/search/photos", {
            headers:{
                "Accept-Version": "v1",
                "Authorization": `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`  
            },
            params:{
                query: searchQuery || "random"    // if searchQuery is empty, use random
            }
        }).then(response => {
            // console.log(response.data);
            setImageList(response.data.results);
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Enter Search" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default ImageSearch
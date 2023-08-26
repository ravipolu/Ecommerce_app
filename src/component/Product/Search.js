import React, { Fragment } from "react";
import { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData";




const Search = () =>{

    const history = useNavigate();
    
    const [ keyword, setKeyword ] = useState("")

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        if(keyword !== ""){
            const searchKeyword = keyword.trim();
            history(`/products/${searchKeyword}`);
        } else {
            history(`/products`);
        }
    }


    return <Fragment>
        <MetaData title="Search a Product -- ECOMMERCE" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder="Search a product ..."
                onChange={(e)=>setKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    </Fragment>
}

export default Search;
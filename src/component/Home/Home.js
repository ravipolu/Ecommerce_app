
import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";

import MetaData from "../layout/metaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";


// redux ke sath me hum aise he use nahi kar skte direct import karke iss lye ye sab ko pahale import karo fir in sab se use karo.....

import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";





const Home = ()=>{

    // const product = {
    //     name: "blue Tshirt",
    //     images:[{url: "https://i.ibb.co/DRST11n/1.webp"}],
    //     price:"3000",
    //     _id:"abhishek",
    // }

    const alert=useAlert();
    const dispatch=useDispatch();

    const {loading, error, products } = useSelector(state=>state.products)

    useEffect(()=>{

        if(error){
            alert.error(error)    // yaha se error return kar dege but iss ke baad tho hum logo ko error bhi clear karna hota hai na iss leye CLEAR_ERROR use kare ge
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    },[dispatch, error, alert])


    return (
        <Fragment>
            {loading ? <Loader />: (
                <Fragment>
                    <MetaData title="Ecommerce"/>

                    <div className="banner">
                    <p>Welcome To Ecommerce</p>
                    <h1>FIND AMAZING PRODUCT BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse/>
                        </button>
                    </a>
                </div>
                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="container">
            
                {products && products.map(product => (
                    <ProductCard key={Math.random()} product={product} />
                ))}
                </div> 
            </Fragment>
            )}
        </Fragment>
    ) 
        
} 

export default Home;
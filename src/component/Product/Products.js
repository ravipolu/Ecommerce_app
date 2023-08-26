import React, { Fragment, useEffect, useState } from "react";
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert"
import MetaData from "../layout/metaData";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhone",
];


const Products = () =>{

    //state banaye ge

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ price, setPrice ] = useState([0, 2000000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings ] =useState(0)

    const dispatch = useDispatch();
    const {keyword} = useParams();
    const alert = useAlert()
    
    const {products, loading, error , productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
        );

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }
    // console.log(productsCount);
    // console.log(resultPerPage);
    // console.log(filteredProductsCount);

    const priceHandler = (event, newPrice)=>{
        setPrice(newPrice);
    }


    useEffect(()=>{
        if(error){
            alert.error(error)    // yaha se error return kar dege but iss ke baad tho hum logo ko error bhi clear karna hota hai na iss leye CLEAR_ERROR use kare ge
            dispatch(clearErrors())
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings)); 
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])   


    const count =filteredProductsCount;

    return <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title="PRODUCTS" />
                <div className="productsHeading"><h2>Products</h2></div>
                <div className="products">
                    {products && products.map((product)=> (<ProductCard key={product._id} product={product} />)
                      )}
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider 
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={2000000}
                    />

                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category)=>(
                            <li className="category-link"
                                key={category}
                                onClick={()=> setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    
                    <fieldset>
                        <Typography component="legend">Rating Above</Typography>
                        <Slider 
                            value={ratings}
                            onChange={(e, newRating)=>{
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />

                    </fieldset>


                </div>
                {resultPerPage < count &&
                    (<div className="paginationBox">
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>)
                }
            </Fragment>
        )}
    </Fragment>
}

export default Products;
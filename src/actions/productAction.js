import axios from 'axios';

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,

    DELATE_PRODUCT_REQUEST,
    DELATE_PRODUCT_SUCCESS ,
    DELATE_PRODUCT_FAIL,
    
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,

    ALL_REVIEW_FAIL,
    ALL_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELATE_REVIEW_RESET,

} from "../constants/productConstant.js"


const base_url = "https://ecommerceappserver-n4oq.onrender.com" //"https://ecommerceappserver-n4oq.onrender.com"  "http://localhost:4000" 

export const getProduct = (keyword="", currentPage=1, price=[0,2000000], category, ratings=0)=>async (dispatch)=>{

    try{
        dispatch({ type: ALL_PRODUCT_REQUEST });

        // console.log(keyword +"   action");

        let link = `${base_url}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `${base_url}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
        }

        const { data }  = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}


export const getAdminProduct = ()=>async (dispatch)=>{

    try{
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data }  = await axios.get(`${base_url}/api/v1/admin/products`, {withCredentials: true});
        // console.log(data);
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })

    }catch(error){
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}


export const createProduct = (productData)=>async (dispatch)=>{
    try{
        dispatch({ type: NEW_PRODUCT_REQUEST });
    
        const config = { 
            headers: {"Content-Type": "multipart/form-data"},
            withCredentials: true,
        };

        const { data } = await axios.post(
            `${base_url}/api/v1/admin/product/new`,
            productData,
            config);
        
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}


export const updateProduct = (id,productData)=>async (dispatch)=>{
    try{
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        
        const config = { 
            headers: {"Content-Type": "multipart/form-data"},
            withCredentials: true,
        };

        const { data } = await axios.put(
            `${base_url}/api/v1/admin/product/${id}`,
            productData,
            config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })

    }catch(error){
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}



export const deleteProduct = (id)=>async (dispatch)=>{
    try{
        dispatch({ type: DELATE_PRODUCT_REQUEST });
        
        const { data } = await axios.delete(`${base_url}/api/v1//admin/deleteProduct/${id}`,{withCredentials: true});

        dispatch({
            type: DELATE_PRODUCT_SUCCESS,
            payload: data.success,
        })

    }catch(error){
        dispatch({
            type: DELATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}



export const getProductDetails = (id)=>async (dispatch)=>{
    try{
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        
        const { data } = await axios.get(`${base_url}/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product,
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const newReview = (reviewData)=>async (dispatch)=>{
    try{
        dispatch({ type: NEW_REVIEW_REQUEST });
        
        const config = {
            headers: { "Content-Type" : "application/json" },
            withCredentials:true,
        };

        const { data } = await axios.put(`${base_url}/api/v1/reviews`,reviewData,config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })

    }catch(error){
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}


// get all reviews of Product

export const getAllReviews = (id)=>async (dispatch)=>{
    try{
        dispatch({ type: ALL_REVIEW_SUCCESS });
        
        const { data } = await axios.get(`${base_url}/api/v1/reviews?id=${id}`,{ withCredentials:true});
        // console.log(data);
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        })

    }catch(error){
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

//delete review of product
export const deleteReviews = (reviewId, productId)=>async (dispatch)=>{
    try{
        dispatch({ type: DELETE_REVIEW_REQUEST });
        
        const { data } = await axios.delete(`${base_url}/api/v1/reviews?id=${reviewId}&productId=${productId}`, { withCredentials:true});

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        })

    }catch(error){
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}





// this is for clearing errors
export const clearErrors = () =>async (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}

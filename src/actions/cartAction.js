import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant.js"
import axios from "axios"


const base_url = "https://ecommerceappserver-n4oq.onrender.com" //  "http://localhost:4000"


export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
    
    const { data } = await axios.get(`${base_url}/api/v1/product/${id}`,
        {withCredentials: true}
    );

    // console.log(data)
    dispatch({
        type : ADD_TO_CART,
        payload: {
            product: data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,  
            stock: data.product.stock,
            quantity,
        }
    });


    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}


export const removeItemFromCart = (id) =>async (dispatch,getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}


export const saveShippingInfo = (data) =>async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    })

    localStorage.setItem("shippingInfo",JSON.stringify(data));
}
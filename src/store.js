import { createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { newProductReducer, newReviewReducer, productDetailReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducers";
import { userReducer ,profileReducer, forgetPasswordReducer, allUserReducer, userDetailsReducer } from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";
import { OrderDetailsReducer, OrdersReducer, allOrdersReducer, myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails : productDetailReducer,
    user:userReducer,
    profile: profileReducer,
    forgetPassword: forgetPasswordReducer,
    cart: cartReducers,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer, 
    orderDetails: OrderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:OrdersReducer,
    allUsers:allUserReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    reviews:reviewReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

        shippingInfo : localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo")) 
        : {},
         
    }
};

const middleWare = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)));


export default store;
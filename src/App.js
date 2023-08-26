import React, { Component, useState } from "react";
import './App.css';
import Header from "./component/Header/Header.js";
import Footer from "./component/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Switch } from "react-router-dom"
import webFont from "webfontloader";
import Home from "./component/Home/Home.js"
// import Loader from "./component/layout/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/Header/UserOptions.js"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgetPassword from "./component/User/ForgetPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "../src/component/admin/Dashboard.js"
import ProductList from "./component/admin/ProductList.js"
import UpdateProduct from "./component/admin/UpdateProduct.js";
import NewProduct from "./component/admin/NewProduct";
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder.js"
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReview from "./component/admin/ProductReview.js"
import Navigation from "./actions/Navigation";
// import Cookies from 'js-cookie'

function App() {

  const { loading, isAuthenticated , user} =useSelector(state=> state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    
    store.dispatch(loadUser());
    

  },[])
  
  return (
    <Router>
    <Navigation />
    {/* <Header /> */}
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/product/:id" Component={ProductDetails}/>
        <Route exact path="/products" Component={Products}/>
        <Route exact path="/search" Component={Search}/>
        <Route exact path="/products/:keyword" Component={Products}/>
        <Route exact path="/login" Component={LoginSignUp}/>
        <Route exact path="/account" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile /></ProtectedRoute>} />
        <Route exact path="/me/update" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile /></ProtectedRoute>}/>
        <Route exact path="/password/update" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdatePassword/></ProtectedRoute>} />
        <Route exact path="/password/forget" Component={ForgetPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/shipping" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Shipping setStripeApiKey={setStripeApiKey} /></ProtectedRoute>} />
        <Route exact path="/order/confirm" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ConfirmOrder /></ProtectedRoute>} />
        {
          stripeApiKey && (
            <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute isAuthenticated={isAuthenticated}><Payment stripeApiKey={stripeApiKey}/></ProtectedRoute></Elements>} />
          )
        }
        <Route exact path="/success" element={<ProtectedRoute isAuthenticated={isAuthenticated}><OrderSuccess /></ProtectedRoute>} />
          <Route exact path="/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MyOrders /></ProtectedRoute>} />
          <Route exact path="/order/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><OrderDetails /></ProtectedRoute>}/>
        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><Dashboard /></ProtectedRoute>}/>
        <Route exact path="/admin/products" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><ProductList /></ProtectedRoute>}/>
        <Route exact path="/admin/product/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><UpdateProduct /></ProtectedRoute>}/>
        <Route exact path="/admin/product" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><NewProduct /></ProtectedRoute>}/>
        <Route exact isAdmin={true} path="/admin/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><OrderList /></ProtectedRoute>} />
        <Route exact isAdmin={true} path="/admin/order/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><ProcessOrder /></ProtectedRoute>}/>
        <Route exact isAdmin={true} path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><UsersList /></ProtectedRoute>}/>
        <Route exact isAdmin={true} path="/admin/user/:userId" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><UpdateUser /></ProtectedRoute>}/>
        <Route exact isAdmin={true} path="/admin/reviews" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} ><ProductReview /></ProtectedRoute>}/>
      </Routes>
      <Footer />
    </Router>
    )
}

export default App;


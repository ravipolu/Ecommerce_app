import React, { Fragment, useEffect, useRef } from "react";
import "./Payment.css"
import MetaData from "../layout/metaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import Cookies  from 'js-cookie';

import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/orderAction";
import { createOrder } from "../../actions/orderAction";
import { removeItemFromCart } from "../../actions/cartAction";




const Payment = (stripeApiKey) =>{

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch=useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const history = useNavigate();
    
    const payBtn = useRef(null);


    const { shippingInfo, cartItems } = useSelector((state)=> state.cart)
    const { user } = useSelector((state)=> state.user)

    const { error } = useSelector((state)=> state.newOrder)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }


    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharge,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try{
            const config = {
                headers: {
                    "Authorization" : `Bearer ${Cookies.get('token')}`,
                    "Content-Type": "application/json",
            },
            withCredentials: true,
                
            };

            // console.log("hum payment m hai")
            const {data} = await axios.post("http://localhost:4000/api/v1/payment/process",
                paymentData,
                config,
            )
            
            const client_secret = data.client_Secret;
            // console.log(client_secret)
            if(!stripe || !elements){
                return;
            }

            const result  = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name:user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            // console.log(result)
            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status === "succeeded"){

                    order.paymentInfo = {
                        id:result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order));
                    
                    {order.orderItems && order.orderItems.filter((item) => {
                        dispatch(removeItemFromCart(item.product))   
                    })}

                    history("/success");
                }else{
                    alert.error(" There's some issue while processing payment ");
                }
            }

            // console.log("after payment method")

        }catch(error){
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }

    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch, error, alert])



    return   (<Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e)=>submitHandler(e)} >
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement  className="paymentInput" />
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className="paymentInput" />
                </div>
                <input 
                    type="submit"
                    value={`pay - Rs ${orderInfo && orderInfo.totalPrice}`}
                    ref={payBtn}
                    className="paymentFormBtn"
                />
            </form>
        </div>
    </Fragment>)
}


export default Payment;
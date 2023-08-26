import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/metaData";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import { useParams } from "react-router-dom"; 
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { Button } from "@material-ui/core"
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import "./ProcessOrder.css"



const ProcessOrder = () => {
    const history= useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert()

    const [ status, setStatus ] = useState("")

    const { error, order, loading } = useSelector((state)=> state.orderDetails);

    const { error: updateError , isUpdated } = useSelector((state)=> state.order);

    const updateOrderProccedHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status",status);
    
        dispatch(updateOrder(id,myForm));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Product Updated Successfully");
            
            dispatch({type: UPDATE_ORDER_RESET})
        }

        dispatch(getOrderDetails(id));

    },[dispatch, alert, error, id, updateError , isUpdated])

        
    return <Fragment>
    <MetaData title="Process Order" />
    <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
        {loading ? <Loader /> :(
            <div className="confirmOrderPage"
                style={{display: order.orderStatus==="Delivered" ? "block" : "grid" }}
            >
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name:</p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>
                                {order.shippingInfo && order.shippingInfo.phoneNo}
                            </span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>
                                {order && order.shippingInfo && 
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                            </span>
                        </div>
                    </div>
                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"
                                }
                            >
                                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}   
                            </p>
                        </div>
                        <div>
                            <p>Amount:</p>
                            <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                    </div>
                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p 
                                className={
                                    order.orderStatus && order.orderStatus === "Delivered"
                                    ? "greenColor": "redColor"
                                }
                            >
                                {order.orderStatus && order.orderStatus}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemContainer">
                        {order.orderItems && (
                            order.orderItems.map((item)=>(
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>{" "}
                                    <span>
                                        {item.quantity} X Rs.{item.price} ={" "}
                                        <b>Rs{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/*  */}
            <div style={{display: order.orderStatus==="Delivered" ? "none" : "block" }}>
            <form
                className="updateOrderForm"
                encType="multipart/form-data" 
                onSubmit={updateOrderProccedHandler}
            >
                <h1>Process Order</h1>
                <div>
                    <AccountTreeIcon />
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                        )}
                    </select>
                </div>

                <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={ loading ? true : false  || status === "" ? true : false }
                >
                    Create
                </Button>    

             </form>
            </div>
        </div>
        )}
        </div>
    </div>
</Fragment>
    
    
        

}

export default ProcessOrder;
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";
import { clearErrors,deleteOrder, getAllOrders } from "../../actions/orderAction.js";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { Button } from "@material-ui/core";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () =>{

    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error , orders } = useSelector((state) => state.allOrders);
    const {error: deleteError, isDeleted} = useSelector((state)=> state.order)
    
    const deleteOrderHandler = (id) =>{
    
        dispatch(deleteOrder(id))

    }

    const columns= [
        {field: "id" , headerName: "Order ID", minWidth: 300, flex: 1},
        {field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
             cellClassName: (params) =>{
                return params.getValue(params.id,"id")==="Delivered" ? "greenColor" : "redColor" 
            }},
        {field: "itemsQty", headerName: "Items Qty", type:"number", minWidth: 150, flex: 0.4},
        {field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5},
        {
            field:"actions",
            headerName:"Actions",
            type: "number",
            mainWidth: 150,
            flex:0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    orders && 
        orders.forEach((item) => {
            rows.push({
                id:item._id,
                itemsQty: item.orderItems.length,
                amount:item.totalPrice,
                status: item.orderStatus,
            })
        });



    useEffect(()=>{
        // if(error){
        //     alert.error(error)
        //     dispatch(clearErrors());
        // }

        // if(deleteError){
        //     alert.error(error);
        //     dispatch(clearErrors());
        // }

        if(isDeleted){
            alert.success("Order Deleted Successfuly")
            history("/admin/orders");
            dispatch({type: DELETE_ORDER_RESET})
        }

        dispatch(getAllOrders());
        // error, isDeleted, deleteError
    },[ alert, dispatch, history,])

    return <Fragment>
        <MetaData title={`ALL ORDERS - Admin`}  />
        <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
                <h1 id="productHeading">ALL ORDERS</h1>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
            </div>
        </div>

    </Fragment>
}

export default OrderList;
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";
import { clearErrors, getAdminProduct , deleteProduct } from "../../actions/productAction";
import Sidebar from "./Sidebar";
import { DELATE_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

const ProductList = () =>{

    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error , products } = useSelector((state) => state.products);
    const {error: deleteError, isDeleted} = useSelector((state)=> state.product)
    
    const deleteProductHandler = (id) =>{
        dispatch(deleteProduct(id))
    }

    const columns= [
        {
            field: "id", 
            headerName:"Product ID", 
            mainWidth:200, 
            flex:0.5 
        },
        {
            field:"name",
            headerName:"Name",
            mainWidth: 250,
            flex:1,
        },
        {
            field:"stock",
            headerName:"Stock",
            type: "number",
            mainWidth: 150,
            flex:0.5,
        },
        {
            field:"price",
            headerName:"Price",
            type: "number",
            mainWidth: 270,
            flex:0.5,
        },
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
                        <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    products && 
        products.forEach((item) => {
            rows.push({
                id:item._id,
                stock: item.stock,
                price:item.price,
                name: item.name,
            })
        });



    useEffect(()=>{

        dispatch(getAdminProduct());

        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Product Deleted Successfuly")
            history("/admin/dashboard");
            dispatch({type: DELATE_PRODUCT_RESET})
        }
        

    },[error, alert, dispatch, history, isDeleted, deleteError])

    return <Fragment>
        <MetaData title={`ALL PRODUCTS - Admin`}  />
        <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
                <h1 id="productHeading">ALL PRODUCTS</h1>
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

export default ProductList;
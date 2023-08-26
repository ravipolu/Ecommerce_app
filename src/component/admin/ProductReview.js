import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReview.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";
import { clearErrors, getAllReviews, deleteReviews } from "../../actions/productAction.js";
import Sidebar from "./Sidebar";
import { DELATE_PRODUCT_RESET, DELETE_REVIEW_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

const ProductReview = () =>{

    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error: deleteError, isDeleted } = useSelector((state) => state.reviews);
    const { error , product, loading } = useSelector((state)=> state.productReviews)
    // console.log(product)
    const [productId , setProductId] = useState("");

    const deleteReviewHandler = (reviewId) =>{

        dispatch(deleteReviews(reviewId , productId))

    }

    const productReviewSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(getAllReviews(productId));

    }

    const columns= [
        {field: "id", headerName:"Review ID", mainWidth:200, flex:0.5 },
        {
            field:"user",
            headerName:"User",
            mainWidth: 180,
            flex:0.6,
        },
        {
            field:"comment",
            headerName:"Comment",
            mainWidth: 350,
            flex:1,
        },
        
        {
            field:"rating",
            headerName:"Rating",
            type: "number",
            mainWidth: 270,
            flex:0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating")>= 3 ? "greenColor" : "redColor";
            }

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
                        <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });


    useEffect(()=>{

        if(productId.length === 24){
            dispatch(getAllReviews(productId));
        }

        // if(error){
        //     alert.error(error)
        //     dispatch(clearErrors());
        // }

        // if(deleteError){
        //     alert.error(error);
        //     dispatch(clearErrors());
        // }

        if(isDeleted){
            alert.success("Review Deleted Successfuly")
            history("/admin/reviews");
            dispatch({type: DELETE_REVIEW_RESET })
        }
        // error, alert,, deleteError

    },[ dispatch, history,isDeleted , productId])

    return <Fragment>
        <MetaData title={`ALL REVIEWS - Admin`}  />
        <div className="dashboard">
            <Sidebar />
            <div className="productReviewsContainer">
                <form
                    className="productReviewsForm"
                    onSubmit={productReviewSubmitHandler}
                >
                    <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
                    <div>
                        <Star />
                        <input 
                            type="text"
                            placeholder="Product ID"
                            required
                            value={productId}
                            onChange={(e)=>setProductId(e.target.value)}
                        />
                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={ loading ? true : false ||  productId === "" ? true : false }
                    >
                        Search
                    </Button>    

                </form>
                
                {product && (product.length > 0 ? (
                    <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
                ) : (
                    <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                ))}

            </div>
        </div>

    </Fragment>
}

export default ProductReview;
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";
import { clearErrors } from "../../actions/productAction";
import Sidebar from "./Sidebar";
import { DELETE_USERS_RESET } from "../../constants/userConstant";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllUsers ,deleteUser} from "../../actions/userAction.js";

const UserList = () =>{

    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error , users } = useSelector((state) => state.allUsers);
    const {error: deleteError, isDeleted, message } = useSelector((state)=> state.profile)
    
    const deleteUserHandler = (id) =>{

        dispatch(deleteUser(id))

    }

    const columns= [
        {field: "id", headerName:"User ID", mainWidth:180, flex:0.5 },
        {
            field:"email",
            headerName:"Email",
            mainWidth: 200,
            flex:1,
        },
        {
            field:"name",
            headerName:"Name",
            mainWidth: 150,
            flex:0.5,
        },
        {
            field:"role",
            headerName:"Role",
            type: "number",
            mainWidth: 150,
            flex:0.5,
            cellClassName: (params) =>{
                return params.getValue(params.id,"role")==="admin" ? "greenColor" : "redColor" 
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
                        <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    users && 
        users.forEach((item) => {
            rows.push({
                id:item._id,
                role: item.role,
                email:item.email,
                name: item.name,
            })
        });



    useEffect(()=>{
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
            history("/admin/users");
            dispatch({type: DELETE_USERS_RESET })
        }

        dispatch(getAllUsers());

    },[error, alert, dispatch, history, isDeleted, deleteError])

    return <Fragment>
        <MetaData title={`ALL Users - Admin`}  />
        <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
                <h1 id="productHeading">ALL Users</h1>
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

export default UserList;
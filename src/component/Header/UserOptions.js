import React, { Fragment, useEffect, useState } from "react";
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useSelector } from "react-redux";
import { Backdrop, ListItemAvatar } from "@material-ui/core";
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction.js";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";



const UserOptions = ({ user }) => {

    const dispatch = useDispatch();
    const [ open, setOpen ] = useState(false)
    const history =useNavigate();
    const alert = useAlert();
    const { cartItems } = useSelector(state=>state.cart)

    const options = [
        { icon: <ListAltIcon />, name: "Order", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{color:cartItems.length>0 ? "tomato" : "unset" }}  />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]


    if(user.role === "admin"){
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }

    function dashboard() {
        history("/admin/dashboard");
    }

    function orders() {
        history("/orders");
    }

    function account() {
        history("/account");
    }

    function cart() {
        history("/cart");
    }

    function logoutUser() {
        dispatch(logout());
        history("/login");
        alert.success("Logout Successfully");
    }


    return <Fragment>
        <Backdrop  open={open} style={{zIndex : "10"}} />
        <SpeedDial
            className="speedDial"
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            style={{zIndex: "11"}}
            direction="down"
            icon={<img 
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : "/logooo.png" }
                alt="Profile"
            />}
        >

        {options.map((item)=>(
            <SpeedDialAction 
                key={item.name} 
                icon={item.icon} 
                tooltipTitle={item.name}  
                onClick={item.func} 
                tooltipOpen    
                />
        ))}   
        </SpeedDial>
    </Fragment>
};


export default UserOptions;
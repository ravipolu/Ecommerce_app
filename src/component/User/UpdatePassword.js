import React, { Fragment, useEffect, useState } from "react";   //useRef ko hum is lye use karte hai kyu ki DOM ko hum react mai directly use nahi kar sakte  >>>document.querySelector("loginForm") aise hum direct nahi use kar skte react mai
import "./UpdatePassword.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors,  updatePassword } from "../../actions/userAction.js";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/metaData";


const UpdatePassword = () =>{

    const dispatch = useDispatch();
    const alert =useAlert()
    const history = useNavigate();

    const { loading , error , isUpdated } = useSelector(state=>state.profile);
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) =>{
        e.preventDefault();
        
        const myForm =new FormData();
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Password Updated Successfully")
            history("/account");
            dispatch({type: UPDATE_PASSWORD_RESET})
        }


    },[dispatch,error,alert,history, isUpdated])

    return  <Fragment>
    {loading ? <Loader /> :(
        <Fragment>
    <MetaData  title="Change Passsword" />
    <div className="updatePasswordContainer">
    <div className="updatePasswordBox">
    <h2 className="heading">Update Password</h2>
    <form 
        className="updatePasswordForm" 
        encType="multipart/form-data" 
        onSubmit={updatePasswordSubmit}
        >
        <div className="signUpPassword">
            <VpnKeyIcon />
            <input 
                type="password"
                placeholder="Old Password"
                required
                name="oldPassword"
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
            />
        </div>
        <div className="signUpPassword">
            <LockOpenIcon />
            <input 
                type="password"
                placeholder="New Password"
                required
                name="newPassword"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
            />
        </div>
        <div className="signUpPassword">
            <LockIcon />
            <input 
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
        </div>   
        <input 
            type="submit" 
            value="Change" 
            className="updatePasswordBtn"  />
    </form>
</div>
</div>
    
</Fragment>  
    )}
</Fragment>

}


export default UpdatePassword;


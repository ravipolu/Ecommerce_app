import React, { Fragment, useEffect, useState } from "react";   //useRef ko hum is lye use karte hai kyu ki DOM ko hum react mai directly use nahi kar sakte  >>>document.querySelector("loginForm") aise hum direct nahi use kar skte react mai
import "./ResetPassword.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors,  resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/metaData";
import { useParams } from "react-router-dom";

const ResetPassword = () =>{

    const dispatch = useDispatch();
    const alert =useAlert()
    const history = useNavigate();

    const { token } = useParams();

    const { loading , error , success } = useSelector(state=>state.forgetPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) =>{
        e.preventDefault();
        const myForm =new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    }

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Password Updated Successfully")
            history("/login");
        }


    },[dispatch,error,alert,history, success])

    return  <Fragment>
    {loading ? <Loader /> :(
        <Fragment>
    <MetaData  title="Change Passsword" />
    <div className="resetPasswordContainer">
    <div className="resetPasswordBox">
    <h2 className="heading">Update Password</h2>
    <form 
        className="resetPasswordForm" 
        encType="multipart/form-data" 
        onSubmit={resetPasswordSubmit}
        >
        <div className="signUpPassword">
            <LockOpenIcon />
            <input 
                type="password"
                placeholder="New Password"
                required
                name="newPassword"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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
            value="Update" 
            className="resetPasswordBtn"  />
    </form>
</div>
</div>
    
</Fragment>  
    )}
</Fragment>

}


export default ResetPassword;

import React, { Fragment, useEffect, useState } from "react";   //useRef ko hum is lye use karte hai kyu ki DOM ko hum react mai directly use nahi kar sakte  >>>document.querySelector("loginForm") aise hum direct nahi use kar skte react mai
import "./UpdateProfile.css"
// import { Avatar, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/metaData";



const UpdateProfile =()=>{

    const dispatch = useDispatch();
    const alert =useAlert()
    const history = useNavigate();

    const { user } = useSelector((state)=>state.user);
    const { loading , error , isUpdated } = useSelector(state=>state.profile);
    
    const [name, setName] = useState("");
    const [email , setEmail] = useState("");
    const [avatar, setAvatar ] = useState("")
    const [ avatarPreview , setAvatarPreview] = useState("/logooo.png");

    const updateProfileSubmit = (e) =>{
        e.preventDefault();
        const myForm =new FormData();
        myForm.set("name", name)
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) =>{
            const reader = new FileReader();

            reader.onload =()=>{
                if(reader.readyState === 2){  //iss ka sirf 3 state hota hai 0>>initial 1>> load and 2>>ready 
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
    }


    useEffect(()=>{

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
            // setAvatar(user.avatar.url)
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully")
            dispatch(loadUser());
            history("/account");
            dispatch({type: UPDATE_PROFILE_RESET})
        }


    },[dispatch,error,alert,history, user, isUpdated])


    return(
        <Fragment>
            {loading ? <Loader /> :(
                <Fragment>
            <MetaData  title="Update Profile" />
            <div className="updateProfileContainer">
            <div className="updateProfileBox">
            <h2 className="heading">Update Profile</h2>
            <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                <FaceIcon />
                    <input 
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="updateProfileEmail">
                <MailOutlineIcon />
                <input 
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}                        
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input 
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                    />
                </div>
                <input type="submit" value="updateProfile" className="updateProfileBtn"  />
            </form>
        </div>
        </div>
            
        </Fragment>  
            )}
        </Fragment>
    ) 
}


export default UpdateProfile; 
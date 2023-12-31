import React, { Fragment, useEffect, useRef, useState } from "react";   //useRef ko hum is lye use karte hai kyu ki DOM ko hum react mai directly use nahi kar sakte  >>>document.querySelector("loginForm") aise hum direct nahi use kar skte react mai
import "./LoginSignUp.css"
// import { Avatar, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import store from "../../store.js"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login , register } from "../../actions/userAction";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader";
import { useNavigate , useLocation } from "react-router-dom";
// import { loadUser } from "../../actions/userAction";



const LoginSignUp = () =>{

    const history = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {error, loading, isAuthenticated } = useSelector((state)=>state.user)

    const alert = useAlert();
    const loginTab =useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    const [ user, setUser ] = useState({
        name: "",
        email : "",
        password: ""
    })

    const { name, email, password } = user;

    const [ avatar, setAvatar ] = useState();
    const [ avatarPreview, setAvatarPreview ] =useState("/logooo.png");


    const switchTabs = (e, tab) =>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft")
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");

        }
    }

    const loginSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    // const [formData , setFormData] = useState({});

    const registerSubmit = (e) =>{
        e.preventDefault();
        const myForm =new FormData();
        myForm.set("name", name)
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        // console.log(myForm)
        dispatch(register(myForm));
    }

    const registerDataChange = (e) =>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload =()=>{
                if(reader.readyState === 2){  //iss ka sirf 3 state hota hai 0>>initial 1>> load and 2>>ready 
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);

        }else{
            setUser({...user, [e.target.name]: e.target.value});
        }
    }

    const redirect=location.search ? location.search.split("=")[1] : `/account`;
    
    useEffect(()=>{

        if(error){
            // console.log("hai errror loginSignup me")
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated === true) {
            history("/account");
        }else{
            history('/login')
        }

    },[dispatch,error,alert,history, isAuthenticated, redirect])


    return <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e)=> switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e)=> switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                    <MailOutlineIcon />
                    <input 
                        type="email"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e)=> setLoginEmail(e.target.value)}
                    />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon />
                        <input 
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e)=> setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forget">Forget Password</Link>
                    <input type="submit" value="Login" className="loginBtn" />
                </form>


                <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                    <div className="signUpName">
                    <FaceIcon />
                    <input 
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                    />
                    </div>
                    <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input 
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                    />
                    </div>
                    <div className="signUpPassword">
                        <LockOpenIcon />
                        <input 
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input 
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                        />
                    </div>
                    <input type="submit" value="Register" className="signUpBtn" disabled={loading ? true : false }/>
                </form>

            </div>
        </div>
    </Fragment>
        )}
    </Fragment>
}


export default LoginSignUp;
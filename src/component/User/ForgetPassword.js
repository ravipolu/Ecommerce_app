import React, { Fragment, useEffect, useState } from "react";   //useRef ko hum is lye use karte hai kyu ki DOM ko hum react mai directly use nahi kar sakte  >>>document.querySelector("loginForm") aise hum direct nahi use kar skte react mai
import "./ForgetPassword.css"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData";



const ForgetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert()
    const history = useNavigate();

    const { loading, error, message } = useSelector(state => state.forgetPassword);

    const [email, setEmail] = useState("");

    const forgetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgetPassword(myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
        }
    }, [dispatch, error, alert, history, message])


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Forget Password" />
                    <div className="forgetPasswordContainer">
                        <div className="forgetPasswordBox">
                            <h2 className="heading">Forget Password</h2>
                            <form className="forgetPasswordForm"
                                onSubmit={forgetPasswordSubmit}>

                                <div className="forgetPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send Email"
                                    className="forgetPasswordBtn" />
                            </form>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}


export default ForgetPassword; 
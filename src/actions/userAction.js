
import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST } from "../constants/orderConstant.js";
import {LOGIN_FAIL,
    LOGIN_SUCCESS, 
    LOGIN_REQUEST,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    CLEAR_ERRORS,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,

    USERS_DETAILS_REQUEST,
    USERS_DETAILS_SUCCESS,
    USERS_DETAILS_FAIL,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_SUCCESS,
    UPDATE_USERS_FAIL,
    UPDATE_USERS_RESET,

    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    DELETE_USERS_FAIL,
    DELETE_USERS_RESET,

 } from "../constants/userConstant.js"

 import axios from "axios"

 const base_url = "https://ecommerceappserver-n4oq.onrender.com"    //    "http://localhost:4000"

 export const login = (email, password) => async(dispatch) => {
    try{

        dispatch({type: LOGIN_REQUEST});


        const config = { 
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        };
        const {data} = await axios.post(
            `${base_url}/api/v1/login`,
            {email,password},
            config, 
        )

        dispatch({type: LOGIN_SUCCESS, payload: data.user })
    }catch(error){
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message})
    }
 };


 export const register = (userData) => async(dispatch) => {
    try{

        dispatch({type: REGISTER_USER_REQUEST});


        const config = { 
            headers: {"Content-Type": "multipart/form-data"},
            withCredentials: true,
        };
        const {data} = await axios.post(
            `${base_url}/api/v1/register`,
            userData,
            config,
        )

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
    }catch(error){
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
 };


 export const loadUser = () => async(dispatch) => {
    try{

        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get(`${base_url}/api/v1/me`,{withCredentials: true})

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user })
    }catch(error){
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message})
    }
 };

 
 export const logout = () => async(dispatch) => {
    try{

        await axios.get(`${base_url}/api/v1/logout`, {withCredentials: true})

        dispatch({type: LOGOUT_SUCCESS })
    }catch(error){
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message})
    }
 };

// update Profile

export const updateProfile = (userData) => async(dispatch)=>{
    try{
        dispatch( {type: UPDATE_PROFILE_REQUEST} );

        const config = { 
            header: { "Content-type": "mutipart/form-data" },
            withCredentials: true,
        };
        // console.log(userData)
        const { data } = await axios.put(`${base_url}/api/v1/update/profile`, userData, config)
        console.log(data)
        dispatch({type: UPDATE_PROFILE_SUCCESS , payload: data.success})
    }catch(error){
        dispatch({type: UPDATE_PROFILE_FAIL , payload: error.response.data.message})
    }
} 


export const updatePassword = (passwords) => async(dispatch)=>{
    try{
        dispatch( {type: UPDATE_PASSWORD_REQUEST} );

        // console.log(passwords)
        const config = { 
            header: { "Content-type": "application/json"}, 
            withCredentials: true
        };
        // console.log("hello")
        const { data } = await axios.put(
            `${base_url}/api/v1/change/password`,
            passwords,
            config
            );
        // console.log(data)    
        dispatch({type: UPDATE_PASSWORD_SUCCESS , payload: data.success})
    }catch(error){
        // console.log(error.response)
        dispatch({type: UPDATE_PASSWORD_FAIL , payload: error.response.data.message})
    }
} 


export const forgetPassword = (email) => async(dispatch) => {
    try{

        dispatch({type: FORGET_PASSWORD_REQUEST});


        const config = { 
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        };
        const {data} = await axios.post(
            `${base_url}/api/v1/password/forget`,
            email,
            config, 
        )

        dispatch({type: FORGET_PASSWORD_SUCCESS, payload: data.message })
    }catch(error){
        dispatch({type: FORGET_PASSWORD_FAIL, payload: error.response.data.message})
    }
 };


 export const resetPassword = (token,passwords) => async(dispatch) => {
    try{

        dispatch({type: RESET_PASSWORD_REQUEST});


        const config = { headers: {"Content-Type": "application/json"},withCredentials: true };
        const {data} = await axios.put(
            `${base_url}/api/v1/password/reset/${token}`,
            passwords,
            config, 
        )

        dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success })
    }catch(error){
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.response.data.message})
    }
 };

// get all users
 export const getAllUsers = () => async(dispatch) => {
    try{
        dispatch({type:ALL_USERS_REQUEST})

        const {data} = await axios.get(`${base_url}/api/v1/admin/users`, {withCredentials: true})

        dispatch({type: ALL_USERS_SUCCESS,payload:data.users })
    }catch(error){
        dispatch({type: ALL_USERS_FAIL, payload: error.response.data.message})
    }
 }; 


//get User detail
 export const getUserDetails = (id) => async(dispatch) => {
    try{
        dispatch({type: USERS_DETAILS_REQUEST})

        const {data} = await axios.get(`${base_url}/api/v1/admin/user/detail/${id}`,{withCredentials: true})

        dispatch({type: USERS_DETAILS_SUCCESS,payload:data.user })
    }catch(error){
        dispatch({type: USERS_DETAILS_FAIL, payload: error.response.data.message})
    }
 };  


// update user details
 export const updateUser = (id, userData ) => async(dispatch)=>{
    try{
        dispatch( {type: UPDATE_USERS_REQUEST} );

        const config = { 
            header: { "Content-type": "application/json" },
            withCredentials: true
    };
        const { data } = await axios.put(
            `${base_url}/api/v1/admin/update/role/${id}`,
            userData,
            config
            );
        dispatch({type: UPDATE_USERS_SUCCESS , payload: data.success})
    }catch(error){
        dispatch({type: UPDATE_USERS_FAIL , payload: error.response.data.message})
    }
} 

// delete user
export const deleteUser = (id) => async(dispatch)=>{
    try{
        dispatch( {type: DELETE_USERS_REQUEST} );
        // console.log(id)
        const { data } = await axios.delete(`${base_url}/api/v1/admin/delete/user/${id}` ,{ withCredentials: true});
        //  console.log(data);
        dispatch({type: DELETE_USERS_SUCCESS , payload: data })
    }catch(error){
        dispatch({type: DELETE_USERS_FAIL , payload: error.response.data.message})
    }
} 

 // this is for clearing errors
export const clearErrors = () =>async (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}
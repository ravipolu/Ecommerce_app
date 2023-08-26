import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes, Redirect, Outlet } from "react-router-dom";


const ProtectedRoute = ({isAuthenticated, isAdmin, children , ...rest }) => {

  const {loading , user} = useSelector((state)=> state.user);

  const handleAdmin = () =>{

    if(isAuthenticated === false){
      return <Navigate to={"/login"} />
    }

    if(isAdmin === true && user.role !== "admin"){
      // console.log("there")
      return <Navigate to={'/login'} />
    }
  }

  useEffect(()=>{
    handleAdmin()
  },[user])
  
  return(<>
      {loading === false && (
        children ? children : <Outlet />
        )}
      </>
  )   
}

export default ProtectedRoute;

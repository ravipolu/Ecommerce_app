import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/metaData";
import { Link, Navigate } from "react-router-dom";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { logout } from "../../actions/userAction";

const Profile =()=>{

  const dispatch = useDispatch();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const history = useNavigate();

    const check = () =>{
      if(!user )
        history("/login")
    }

    useEffect(() => {
        check();
      }, [user, isAuthenticated]);
      
    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={`${user?.name}'s Profile`} />
              <div className="profileContainer">
                <div>
                  <h1>My Profile</h1>
                  <img src={user?.avatar?.url} alt={user?.name} />
                  <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user?.name}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <h4>Joined On</h4>
                    <p>{String(user?.createdAt).substr(0, 10)}</p>
                  </div>
    
                  <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                    <Link to="/login" onClick={()=>{dispatch(logout())}}>Log Out</Link>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );
    };


export default Profile;
import React, { Fragment } from "react";
// import ReactStars from "react-rating-stars-component"
import profilePng  from "../../image/logo.png";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({review}) =>{

    const options = {
        value: review.rating,
        // readOnly: true,
        precision: 0.5,
      };

    return <Fragment>
        <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span>{review.comment}</span>
    </div>
    </Fragment>
}

export default ReviewCard;
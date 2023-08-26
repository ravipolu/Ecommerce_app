import React from "react";
import "./Footer.css"
import appleStore from "../../image/iosStore1.jpeg"
import playStore from "../../image/playStore.png"


const Footer =()=>{
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App For Android And IOS Mobile Phone</p>
                <img src={playStore} alt="playStore"/>
                <img src={appleStore} alt="appleStore"/>
            </div>
            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>High Quality Is Our First Priority</p>
                <p>Copyrights 2023 &copy; Ecommerce@Shoping</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://instagram.com">instagram</a>
                <a href="https://instagram.com">facebook</a>
                <a href="https://instagram.com">tweeter</a>
            </div>
        </footer>
    )
}


export default Footer;
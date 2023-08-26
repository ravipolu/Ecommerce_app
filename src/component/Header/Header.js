import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../image/logo.png"
// import { CgUser } from "react-icons/cg";



const Header = () =>{
    return <ReactNavbar 
        burgerColorHover="#eb4034"
        logo={logo}
        logoWidth="15vmax"
        navColor1="rgba(255,255,255,0.6)"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        link1Text="Home"
        link2Text="Product"
        link3Text="Content"
        link4Text="About"

        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"

        link1Size="1.3vmax"
        link1Color="rgba(35, 35, 35, 0.8)"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1Margin="1vmax"
        // searchIcon={true}
        // SearchIconElement={true}
        // cartIcon={true}
        // profileIcon={true}
        // profileIconElement={ CgUser }
        profileIconColor="rgba(35, 35, 35, 0.8)"
        searchIconColor="rgba(35, 35, 35, 0.8)"
        cartIconColor="rgba(35, 35, 35, 0.8)"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        profileIconColorHover="#eb4034"	
        cartIconMargin="1vmax"

    />
        
};

export default Header;
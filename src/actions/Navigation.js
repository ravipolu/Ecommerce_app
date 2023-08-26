import "./Navigation.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../image/logo.png"
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { Fragment, useState } from "react";


const Navigation = () => {

    const history = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <MenuIcon className="menuBar" onClick={() => setOpen(true)} />
            
                <div className={`navigateMainDiv ${open ? 'active' : 'deactive'}`} >
                    <CloseIcon className="cancelDiv" onClick={()=>setOpen(false)}/>
                    <div className={`logo ${open ? 'active' : 'deactive'}`}>
                        <img src={logo} alt="logo" onClick={() => { <Navigate to={"/"} /> }} />
                    </div>
                    <div className={`homeDiv ${open ? 'active' : 'deactive'}`}><a href="/">Home</a></div>
                    <div className={`productDiv ${open ? 'active' : 'deactive'}`}><a href="/products">Products</a></div>
                    <div className={`contactDiv ${open ? 'active' : 'deactive'}`}><a href="/contact">Contact</a></div>
                    <div className={`aboutDiv ${open ? 'active' : 'deactive'}`}><a href="/about">About</a></div>
                    <div className={`userDiv ${open ? 'active' : 'deactive'}`}>
                        <SearchIcon onClick={() => { history("/search")
                            setOpen(false)}} />
                        <ShoppingCartIcon onClick={() => { history("/orders") 
                            setOpen(false)}} />
                        <PersonIcon onClick={() => { history("/account")  
                            setOpen(false)}} /></div>
                </div>
            

        </Fragment>
    )
}

export default Navigation;
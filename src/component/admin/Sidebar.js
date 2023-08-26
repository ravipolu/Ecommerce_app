import React from "react";
import "./Sidebar.css"
import logo from "../../image/logo.png"
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PeopleIcon from "@material-ui/icons/People";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";



const Sidebar = () => {
    return <div className="sidebar">
        <Link to="/">
            <img src={logo} alt="Ecommerce" />
        </Link>
        <Link to="/admin/dashboard" >
            <p>
                <DashboardIcon />Dashboard
            </p>
        </Link>    
        <TreeView className=""
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
        >
            <TreeItem nodeId="1" label="Products" >
                <Link to="/admin/products">
                    <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                </Link>
                <Link to="/admin/product">
                    <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                </Link>
            </TreeItem>
        </TreeView>
            
        <Link to="/admin/orders">
            <p>
                <ListAltIcon />
                Orders
            </p>
        </Link>
        <Link to="/admin/users">
            <PeopleIcon /> Users
        </Link>
        <Link to="/admin/reviews">
            <p>
                <RateReviewIcon /> Reviews
            </p>
        </Link>
    </div>
}

export default Sidebar;
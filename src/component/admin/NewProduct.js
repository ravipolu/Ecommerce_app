import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css"
import MetaData from "../layout/metaData";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import { createProduct } from "../../actions/productAction";
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import DescriptionIcon from "@material-ui/icons/Description"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import StorageIcon from "@material-ui/icons/Storage"
import { Button } from "@material-ui/core";
import { clearErrors } from "../../actions/productAction";

const NewProduct = () =>{
    
    const categories=[
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhone",
    ]


    const history = useNavigate();
    const dispatch = useDispatch();
    const alert= useAlert();

    const { loading , error, success } = useSelector((state)=> state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock , setStock ]= useState(0);
    const [images , setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState("");

    const [ file, setFile ] = useState()
    const createProductSubmitHandler = (e) =>{
        e.preventDefault();

        // console.log(name , "< " , price, "< " ,description, "< " ,category, "< " ,stock, "< " ,images)
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("stock",stock);

        images.forEach(((img)=> {
            myForm.append("images",img);
        }))
        
        dispatch(createProduct(myForm));
    }


    const createProductImagesChange = (e) => {
           
        const files = e.target.files;

        setFile(files);
        
        // console.log(files);

        
        for(let i=0; i< files.length ; i++){
            const reader = new FileReader();

            reader.readAsDataURL(files[i]);

            reader.onloadend = () => {   
                setImages((old)=>[...old,reader.result]);
            }
        }
        // console.log(images)
          
    }


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Product Created Successfully");
            history("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET})
        }
    },[dispatch,error,alert,history,success])

    
    
    
    return <Fragment>
        <MetaData title="Create Products" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data" 
                    onSubmit={createProductSubmitHandler}
                >
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckIcon />
                        <input 
                            type="text"
                            placeholder="Product Name"
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <AttachMoneyIcon />
                        <input 
                            type="number"
                            placeholder="Price"
                            required
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <DescriptionIcon />
                        <textarea 
                            type="text"
                            placeholder="Product Description"
                            required
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            cols="30"
                            rows="1"
                        ></textarea>
                    </div>
                    <div>
                        <AccountTreeIcon />
                        <select onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}>{cate}</option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon />
                        <input 
                            type="number"
                            placeholder="Stock"
                            required
                            onChange={(e)=>setStock(e.target.value)}
                        />
                    </div>
                    <div id="createProductFormFile">
                        <input 
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={createProductImagesChange}
                        />
                    </div>
                    {/* <img src={images} alt="Product Preview" /> */}
                    {/* <div id="createProductFormImage">
                        {images && images.map((image,index)=>{
                            <img key={index} src={image} alt="Product Preview" />
                        })}
                    </div> */}

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={ loading ? true : false }
                    >
                        Create
                    </Button>    

                </form>
            </div>
        </div>
    </Fragment>
}

export default NewProduct;
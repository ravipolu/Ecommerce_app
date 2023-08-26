import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css"
import MetaData from "../layout/metaData";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import { clearErrors , updateProduct, getProductDetails } from "../../actions/productAction";
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import DescriptionIcon from "@material-ui/icons/Description"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import StorageIcon from "@material-ui/icons/Storage"
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";


const UpdateProduct = () =>{
    
    const categories=[
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhone",
    ]

    const { id } = useParams();

    const history = useNavigate();
    const dispatch = useDispatch();
    const alert= useAlert();

    const { loading , error: updatedError, isUpdated } = useSelector((state)=> state.product);
    const { product, error } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock , setStock ]= useState(0);
    const [images , setImages] = useState([]);
    const [oldImages, setOldImages] =useState([]);
    const [file, setFile] = useState([]);
    
    const updateProductSubmitHandler = (e) =>{
        e.preventDefault();
        
        // console.log(name , "< " , price, "< " ,description, "< " ,category, "< " ,stock, "< " ,images)

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("stock",stock);

        images.forEach((image)=>{
            myForm.append("images",image);
        });
        // console.log(images)
        dispatch(updateProduct(id,myForm));
    }


    const updateProductImagesChange = (e) => {
           
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
       
        if(product && product._id !== id){
            dispatch(getProductDetails(id));
            
        }else{
            
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updatedError){
            alert.error(updatedError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Product Updated Successfully");
            history("/admin/products");
            dispatch({type: UPDATE_PRODUCT_RESET})
        }
    },[dispatch,error,alert,history,isUpdated,id,product,updatedError])

    
    
    
    return <Fragment>
        <MetaData title="Create Products" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data" 
                    onSubmit={updateProductSubmitHandler}
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
                            value={price}
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
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}> {cate}</option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon />
                        <input 
                            type="number"
                            placeholder="Stock"
                            required
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                        />
                    </div>
                    <div id="createProductFormFile">
                        <input 
                            type="file"
                            name="productImage"
                            accept="image/*"
                            multiple
                            onChange={updateProductImagesChange}
                        />
                    </div>
                    <div id="createProductFormImage">
                        {product.images && product.images.map((image,index)=>{
                            <img key={index} src={image.url} alt="Product Preview" />
                        })}
                    </div>

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

export default UpdateProduct;
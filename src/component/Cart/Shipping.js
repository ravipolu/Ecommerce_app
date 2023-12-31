import React, { Fragment, useState } from "react";
import "./Shipping.css"
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/metaData";
import PinDropIcon from "@material-ui/icons/PinDrop"
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public"
import PhoneIcon from "@material-ui/icons/Phone"
import TransferWithinStationIcon from "@material-ui/icons/TransferWithinAStation"
import { Country, State } from "country-state-city"
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom"; 
import CheckoutSteps from "./CheckoutSteps";
import axios from "axios";


const Shipping = ({setStripeApiKey}) => {

    const base_url = "https://ecommerceappserver-n4oq.onrender.com" // "http://localhot:4000"   {withCredentials: true} ${base_url}
    const dispatch= useDispatch();
    const alert =useAlert();
    const history=useNavigate();

    const { shippingInfo } = useSelector(state=> state.cart)



    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    async function getStripeApiKey() {
        const { data } = await axios.get(`${base_url}/api/v1/stripeapikey`);
        
        console.log(data.stripeApiKey);

        setStripeApiKey(data.stripeApiKey);
        // console.log(data.stripeApiKey)
    }

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length>10){
            alert.error("Phone Number should be 10 digit")
            return
        }
        dispatch(saveShippingInfo({ address, city, country, state, pinCode, phoneNo}))

        getStripeApiKey();

        history("/order/confirm")
    }



    return <Fragment>
        <MetaData title="Shipping Details" />

        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>

                <form className="shippingForm"
                    encType="multipart/form-data"
                    onSubmit={shippingSubmit}
                >

                    <div>
                        <HomeIcon />
                        <input 
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <LocationCityIcon />
                        <input 
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <PinDropIcon />
                        <input 
                            type="number"
                            placeholder="Pin Code"
                            required
                            value={pinCode}
                            onChange={(e)=>setPinCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <PhoneIcon />
                        <input 
                            type="number"
                            placeholder="Phone Number"
                            required
                            value={phoneNo}
                            onChange={(e)=>setPhoneNo(e.target.value)}
                            size="10"
                        />
                    </div>
                    <div className="countrySelect">
                        <PublicIcon />
                        <select 
                            required
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {Country && 
                                Country.getAllCountries().map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            ))}
                        </select>
                         
                    </div>

                    {country && (
                        <div className="stateSelect">
                        <TransferWithinStationIcon />
                        <select 
                            required
                            value={state}
                            onChange={(e)=> setState(e.target.value)}>
                                <option value="">State</option>
                                {State && (
                                    State.getStatesOfCountry(country).map((item)=>(
                                        <option key={item.isoCode} value={item.isoCode} > {item.name} </option>
                                    ))
                            )}
                            </select>       
                        </div>
                    )}

                    <input 
                        type="submit"
                        value="Continue"
                        className="shippingBtn"
                        disabled={state ? false : true}
                    />

                </form>

            </div>
        </div>
    </Fragment>
}

export default Shipping;
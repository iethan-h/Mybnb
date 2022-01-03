/* eslint-disable no-unused-vars */
import React, { useState} from "react";
import { useDispatch,useSelector} from "react-redux";
import {newLocation} from '../../store/location'
import './newHost.css'


const NewHostForm = ({setShowModal}) => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [price, setPrice] = useState('')
    const userId = useSelector((state) => state.session?.user?.id);
    const [image, setImage] = useState('')
    
    const handleSubmit = async (e) => {
        const regex = /\d/;
        const urlTest = /\.(jpeg|jpg|gif|png)$/;
        e.preventDefault();
        let error = []
        if(address.length > 250){
            error.push("Address must be less than 250 characters.")
        }
        else if(address.length === 0 || address.length < 5){
            error.push("Please enter an address that is 5 characters or more in length")
        }
        if(city.length === 0){
            error.push("Please enter a city")
        }
        if(image.length > 250){
            error.push("Image link must be less than 250 characters.")
        }
        if(image.length === 0 ){
            error.push("Please enter an image link")
        }
        if(urlTest.test(image) === false){
            error.push("Please enter a valid url")
        }
        if(state.length < 2 || state.length > 3){
            error.push("Enter the state initials")
        }
        if(country.length < 2 || country.length > 50){
            error.push("Please enter your country or its initials")
        }
        if(regex.test(price) === false || price.length === 0){
            error.push("Please enter a price for your hosting.")
        }
        if(error.length){
            setErrors(error)
            return
        }
        const payload ={
            userId,
            address,
            city,
            state,
            country,
            price,
            image,

        }
        let data = dispatch(
            newLocation(payload)
        )
        if(data){
            setErrors([data])
        }
            setShowModal(false)
    }
    
    return (
        <div>
            <form className='forms'>
                <div>
            {errors.map((error, ind) => (
              <div className="errors" key={ind}>{error}</div>
            ))}
            </div>
                <fieldset>
                    <div className="forms">
                        <legend>Host a new location</legend>
                    </div>
                        <div className="data">
                            <input
                             type="text" 
                             placeholder="Address" 
                             value={address}
                             onChange={(e) => setAddress(e.target.value)}
                             />
                        </div>
                        <div className="data">
                            <input 
                            type="text" 
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            />                           
                        </div>
                        <div className="data">
                            <input 
                            type="text" 
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            />                 
                        </div>
                        <div className="data">
                            <input 
                            type="text" 
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            />                       
                        </div>
                        <div className="data">
                            <input 
                            type="text" 
                            placeholder="Price per day"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />                         
                        </div>
                        <div className="data">
                            <input 
                            type="text" 
                            placeholder="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            />                         
                        </div>
                        <div className="forms">
                            <button className="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                </fieldset>
            </form>   
        </div>
    )
    
}
export default NewHostForm
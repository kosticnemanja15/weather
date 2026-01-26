import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


const Home = (): JSX.Element  => {



    const getAddress = (location:GeolocationPosition) => {
        const latitude:number = location.coords.latitude;   
        const longitude:number = location.coords.longitude;

        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}+&format=json`)
              .then(response => console.log(response.data.address.city))
                 
            }

    const addressForbidden = () => console.log("We got reject");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getAddress,addressForbidden);
    }else{
        console.log("Get location not supported");
    }

 

    const validCities:string[] = ["Beograd","Subotica","Novi sad","Zagreb","Sarajevo"];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const isValidCityName = (name:string) => validCities.includes(name);
    


    const onFormSubmit = (data:object) => console.log("Works");
    

    return<>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <input {...register('cityName',{
                validate:isValidCityName               
            })} 
            type="text" placeholder="Unesite ime grada"/>
        </form>
    </>
}


export default Home;
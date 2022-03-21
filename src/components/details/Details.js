import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './details.css'
const Details = () => {
    const {serviceId} = useParams();
    const [service,setService] = useState([]);
    
    useEffect(()=>{
        fetch('https://himdrakibulislam.github.io/jsonfile/healthService.json')
        .then(res =>res.json())
        .then(data => setService(data))
    },[])
    const spacify = ()=>{
        return service.find(ser => ser.id == serviceId);
    }
   const {name,img,description} = spacify() || {}
    return (
        <div className='details-style text-center '>
            <p>Product No : {serviceId}</p>
            <img className='img-fluid' src={img} alt="" />
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Details;
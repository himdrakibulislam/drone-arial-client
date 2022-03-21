import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Service from '../service/Service';

const Services = () => {
    const [service,setService] = useState([]);
    useEffect(()=>{
        fetch('https://himdrakibulislam.github.io/jsonfile/healthService.json')
        .then(res=>res.json())
        .then(data => setService(data))
    },[])
    return (
        <div>
            <h3 className='text-center mb-5'>Services</h3>
            <Row lg={3} md={2} sm={1}>
            {
                service.map(service =><Service
                    key={service.id}
                    service={service}></Service>)
            }
            </Row>
        </div>
    );
};

export default Services;
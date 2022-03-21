import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Service = (props) => {
    const {id,name,img} = props.service;
    return (
        <div className='design'>
           <Col>
           <Card style={{ width: '20rem',margin:'0' }}>
            <Card.Img variant="top" width="300" height="150" src={img} />
            <Card.Body>
                <Card.Title className='text-center'>{name}</Card.Title>
                <Link to={`details/${id}`}><button className='btn btn-info w-100'>Details</button></Link>
            </Card.Body>
           
            </Card>
           </Col>
        </div>
    );
};

export default Service;
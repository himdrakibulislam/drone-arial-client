import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './footer.css'
const Footer = () => {
    return (
        <div className='footer text-white p-5'>
           <Row lg={3} md={2} sm={1}>
               <Col>
               <h5>HEADQUARTERS</h5>
               <p>3079 west sahara avenue. suite 362 las vegas</p>
               <p>support@linethemes.com</p>
               <p>01 800 688 8688</p>
               </Col>
               <Col>
               <h5>SERVICES</h5>
               <p>Daily Care</p>
               <p>Hourly</p>
               <p>Hospital to home</p>
               </Col>
               <Col>
               <h5>COMPANY</h5>
               <p>About us</p>
               <p>Location</p>
               <p>More About us</p>
               </Col>
           </Row>
        </div>
    );
};

export default Footer;
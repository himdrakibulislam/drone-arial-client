import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import drone1 from '../../../images/drone1.jpeg';
import drone2 from '../../../images/drone2.jpg';
import drone3 from '../../../images/drone3.jpg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div  >
            <Carousel>
                <div>
                    <img src={drone1} alt=""/>
                    
                </div>
                <div>
                    <img src={drone2} alt=""/>
                   
                </div>
                <div>
                    <img src={drone3} alt=""/>
            
                </div>
            </Carousel>
           <Link style={{textDecoration:'none'}} to="/explore">
           <Button variant="outlined" size="large">
                Explore Now
        </Button>
           </Link>
        </div>
    );
};

export default Banner;
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div  >
             <video width='100%' height='100%' loop autoPlay muted>
             <source
                src='https://res.cloudinary.com/dae6oihks/video/upload/v1653213771/dronearial_qyx0zk.mp4'
                type="video/mp4"
                />
            </video>
            <br />
            <br />
           <Link style={{textDecoration:'none'}} to="/explore">
           <Button variant="outlined" size="large">
                Explore Now
        </Button>
           </Link>
        </div>
    );
};

export default Banner;
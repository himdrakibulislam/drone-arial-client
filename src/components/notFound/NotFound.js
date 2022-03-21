import React from 'react';
import notFoundImage from './notFound.png'
import './notFound.css'
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className='notFound text-center'>
            <Link to='/home'><button className='btn btn-dark home-button'>Go To Home</button></Link>
        </div>
    );
};

export default NotFound;
import { Container } from '@mui/material';
import React from 'react';
import Footer from '../../shared/footer/Footer';
import Review from '../review/Review';
import Banner from './banner/Banner';
import Products from './products/Products';

const Home = () => {
  
    return (
        <div>
            <Container>
           <Banner></Banner> 
           <Products></Products>
           <Review></Review>
           <Footer></Footer>
          </Container> 
        </div>
    );
};

export default Home;
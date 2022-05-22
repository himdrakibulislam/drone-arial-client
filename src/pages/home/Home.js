import React from 'react';
import Footer from '../../shared/footer/Footer';
import Review from '../review/Review';
import Banner from './banner/Banner';
import Products from './products/Products';

const Home = () => {
  
    return (
        <div>

           <Banner></Banner> 
           <Products></Products>
           <Review></Review>
           <Footer></Footer>
          
        </div>
    );
};

export default Home;
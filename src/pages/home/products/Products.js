import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Product from '../product/Product';

const Products = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return (
        <div>
            <Container >
                <Box>
            <Typography variant='h4' sx={{my:5}}>
                Most Popular Drones
            </Typography>
            
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                products.map(product => <Product
                     key={product._id} 
                     product={product}
                >
                </Product>)
            }
            </Grid>
            </Box>
            </Container>
           
        </div>
    );
};

export default Products;
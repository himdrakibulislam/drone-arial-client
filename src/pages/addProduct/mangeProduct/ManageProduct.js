import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
const ManageProduct = () => {
    const [products,setProducts ] =useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/allproducts')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return (
        <div>
            <h3>Manage Products</h3>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 6, md: 16 }}>
            

            {
           products.map(product=><Box key={product._id} sx={{display:'flex',my:3,alignItems:'center',justifyContent:'center'}}>
               <Grid item sx={{width:'300px',height:'170px'}} >
               <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {
              product.name  
            }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           USD$ {
               product.Price
           }
          </Typography>
             <Button variant="outlined"  startIcon={<DeleteIcon />}>
                Delete
                </Button>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={product.imageUrl}
        alt="Live from space album cover"
      />
    </Card>
      </Grid>
           </Box>)

           }    
       </Grid>
        </div>
    );
};

export default ManageProduct;
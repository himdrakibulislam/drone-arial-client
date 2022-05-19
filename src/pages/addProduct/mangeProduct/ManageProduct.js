import {  Button, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
const ManageProduct = () => {
    const [products,setProducts ] =useState([])
    useEffect(()=>{
        fetch('https://afternoon-badlands-69676.herokuapp.com/allproducts')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);
    const deleteProduct = (id,imageId)=>{
      // delete image
      const imageurl = `https://afternoon-badlands-69676.herokuapp.com/deleteimage/${imageId}`
      fetch(imageurl, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data => {})
      // delete product
      const url = `https://afternoon-badlands-69676.herokuapp.com/deleteProduct/${id}`
      fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data =>{ if(data.deletedCount){
        const remaining =   products.filter(product => product._id !== id )
        setProducts(remaining);
      }})

    }
    return (
        <div>
            <h3>Manage Products</h3>
            {
              products.length === 0? <CircularProgress/> :<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {products.map((product) => (
              <Grid item xs={4} sm={4} md={6} key={product._id}>
                <img src={product.imageUrl} width="200" height="180" alt="" />
                <p>{product.name}</p>
                <p>{product.description.slice(0,100)}</p>
                <small>$ { product.Price}</small>
                <br />
              
                <Link to={`/dashboard/editproduct/${product._id}`} style={{textDecoration:'none'}}><Button sx={{mr:2}} variant="outlined"><EditIcon></EditIcon> Edit</Button></Link>
                <Button variant="outlined" onClick={()=> deleteProduct(product._id,product.imageId)}><DeleteIcon></DeleteIcon> Delete</Button>
              </Grid>
            ))}
          </Grid>
            
            }
        </div>
    );
};

export default ManageProduct;
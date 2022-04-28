import { Button, Container, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';
import Footer from '../../shared/footer/Footer';

const PlaceOrder = () => {
    const {productId} = useParams();
    const [product,setProduct] = useState({});
    const [orderInfo,setOrderInfo] = useState({});
    const history = useHistory()
    const {user} = useAuth();
    useEffect(()=>{
        const url = `http://localhost:5000/placeorder/${productId}`
        fetch(url)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productId])
    const {name,imageUrl,description,Price} = product
    const alignItems = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
    const handleOrderSubmit = (e)=>{
        e.preventDefault();
        const submitOrderInfo = {
            ...orderInfo,
            product
        }
        fetch('http://localhost:5000/placeorder',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(submitOrderInfo)

        }).then(res =>res.json())
        .then(data => {if(data.insertedId){
            history.replace('/')
        }})
    }
    const handleOrderOnChange = (e)=>{
        const field = e.target.name;
        const value = e.target.value;
        const newOrderInfo = {...orderInfo};
        newOrderInfo[field] = value;
        setOrderInfo(newOrderInfo);
    }
    return (
        <Container sx={{my:10}}>
        <Grid container spacing={2}>
            <Grid sx={alignItems}  item xs={12} md={6}>
               <Box>
               <img src={imageUrl} width="100%" height="75%" alt="" />
                <h2>{name}</h2>
                <p>{description}</p>
                <h4>USD ${Price}</h4>
               </Box>
            </Grid>
            <Grid sx={alignItems} item xs={12} md={6}>
            <form onSubmit={handleOrderSubmit}>
            <TextField id="standard-basic"
            required
            type="name"
            name="name"
            onChange={handleOrderOnChange}
            defaultValue={user.displayName}
             label="Name"
             sx={{width:'90%',my:3}}
            variant="standard"
               />
           
            <TextField id="standard-basic"
            required
            type="email"
            name="email"
            defaultValue={user.email}
            onChange={handleOrderOnChange}
             label="Email"
             sx={{width:'90%',my:3}}
            variant="standard"
               />
               
            <TextField id="standard-basic"
            required
            type="text"
            name="city"
            onChange={handleOrderOnChange}
             label="City"
             sx={{width:'90%',my:3}}
            variant="standard"
               />
            <TextField id="standard-basic"
            required
            type="text"
            name="street"
            onChange={handleOrderOnChange}
             label="Street"
             sx={{width:'90%'}}
            variant="standard"
               />
            <TextField id="standard-basic"
            required
            type="number"
            onChange={handleOrderOnChange}
            name="phone"
             label="Phone Number"
             sx={{width:'90%',my:3}}
            variant="standard"
               />
               <Button type='submit' sx={{width:'90%',my:3}} variant="outlined">Order Now</Button>
            </form>
            </Grid>
            </Grid>
            <Footer></Footer>
            </Container>
    );
};

export default PlaceOrder;
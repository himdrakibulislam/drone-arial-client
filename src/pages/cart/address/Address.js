import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Address = ({setAddress,total}) => {
    const {user} = useAuth();
    const initalInfo = {name:user.displayName,email:user.email};
    const [orderInfo,setOrderInfo] = useState(initalInfo);
    const history = useHistory();
    const handleOrderSubmit = (e)=>{
        e.preventDefault();
        setAddress(orderInfo);
        localStorage.setItem('address',JSON.stringify(orderInfo))
        localStorage.setItem('total',JSON.stringify(total))
        if(orderInfo){
            history.replace('/pay');
        }
        // const submitOrderInfo = {
        //     ...orderInfo
        // }
        // fetch('https://afternoon-badlands-69676.herokuapp.com/placeorder',{
        //     method:'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //       },
        //       body: JSON.stringify(submitOrderInfo)

        // }).then(res =>res.json())
        // .then(data => {if(data.insertedId){
        //     history.replace('/')
        // }})
    }
    const handleOrderOnChange = (e)=>{
        const field = e.target.name;
        const value = e.target.value;
        const newOrderInfo = {...orderInfo};
        newOrderInfo[field] = value;
        setOrderInfo(newOrderInfo);
    };
    return (
        <div>
            <h4>Address</h4>
            <Container>
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
               <Button type='submit' sx={{width:'90%',my:3}} variant="outlined">Proceed To Pay</Button>
            </form>
            </Container>
        </div>
    );
};

export default Address;
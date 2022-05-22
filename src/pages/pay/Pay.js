import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
const Pay = ({total,productInfo,address,setTotal,setProductInfo,setAddress}) => {
    const localStorageProduct = localStorage.getItem('product');
    const localStorageAddress = localStorage.getItem('address');
    const localStoragePrice = localStorage.getItem('total');
    const history = useHistory();
    useEffect(()=>{
        setTotal(JSON.parse(localStoragePrice));
        setProductInfo(JSON.parse(localStorageProduct));
        setAddress(JSON.parse(localStorageAddress));
    },[localStorageProduct,localStorageAddress,localStoragePrice,setAddress,setProductInfo,setTotal]);
    const {user} = useAuth();
    const pay =()=>{
        const orderInfo = {
           email:user.email,
           total:total,
           products:productInfo,
           address:address,
           status: 'pending',
           paymentType:'default'
        }
         fetch('https://afternoon-badlands-69676.herokuapp.com/placeorder',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(orderInfo)

        }).then(res =>res.json())
        .then(data => {if(data.insertedId){
            localStorage.clear('address');
            localStorage.clear('total');
            localStorage.clear('product');
            alert('Order Confirmed');
            const url =`https://afternoon-badlands-69676.herokuapp.com/clearCart/${user.email}`;
            fetch(url,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data =>{})
            history.replace('/');
        }})  

    };
    return (
        <div>
            <h3>Pay ${total}</h3>
             <Button variant='contained' onClick={pay}>Pay</Button>
        </div>
    );
};

export default Pay;
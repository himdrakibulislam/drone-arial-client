import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
const MyOrders = () => {
    const [myOrders,setMyOrders] = useState([]);
    const {user,idToken} = useAuth();
    useEffect(()=>{
        const url = `http://localhost:5000/userorders?email=${user.email}`
        fetch(url,{
            headers:{
                'authorization':`Bearer ${idToken}`
              }
        })
        .then(res => res.json())
        .then(data => setMyOrders(data))
    },[user.email,idToken]);
    const deleteOrder = (id)=>{
        const confirm = window.confirm("Do You Want Delete?");
        if(confirm){
            const url = `http://localhost:5000/userorders/${id}`
        fetch(url,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(data =>{if(data.deletedCount){
            alert("Order Deleted Successfully");
            const remaining = myOrders.filter(remainOrder => remainOrder._id !== id);
            setMyOrders(remaining)
        }})
        }else{
            
        }
        
    }
    return (
        <div> 
           {
           myOrders.map(myOrder=><Box key={myOrder._id} sx={{display:'flex',my:3,alignItems:'center',justifyContent:'center'}}>
               <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {
                myOrder.product.name
            }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           USD$ {
               myOrder.product.Price
           }
          </Typography>
             <Button variant="outlined" onClick={()=>deleteOrder(myOrder._id)} startIcon={<DeleteIcon />}>
                Delete
                </Button>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={myOrder.product.imageUrl}
        alt="Live from space album cover"
      />
    </Card>
           </Box>)

           }    
       </div>
    );
};

export default MyOrders;
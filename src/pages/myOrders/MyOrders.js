import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './myorder.css'

const MyOrders = () => {
    const [myOrders,setMyOrders] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const {user,idToken} = useAuth();
    useEffect(()=>{
      setIsLoading(true);
        const url = `https://afternoon-badlands-69676.herokuapp.com/userorders/${user.email}`
        fetch(url,{
            headers:{
                'authorization':`Bearer ${idToken}`
              }
        })
        .then(res => res.json())
        .then(data => setMyOrders(data))
        .finally(()=>setIsLoading(false))
    },[user.email,idToken]);
    if(isLoading){
      return <CircularProgress></CircularProgress>
    }
    return (
        <div> 
         
         {
           myOrders.length === 0 ? <h3 style={{marginTop:'200px'}}>No Orders</h3>: <> 
          
           {myOrders.map((row) => <div
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                  row.products.map(product=> <Grid item xs={2} sm={4} md={4}>
                    <div>
                  <img src={product.product.imageUrl} width="200" alt="" />
                </div>

                <div>
                    <p>{product.product.name}</p>
                    <small>${product.product.Price}</small>x
                    <small>{product.product.quantity}</small>
                </div>
                        </Grid>
                  )
                }
                
                 </Grid>
                 <h3 style={{textAlign:'right',margin:'100px'}}> Total ${row.total}</h3>
              </div>)
            }
            

           
           
          
           </>
         }
       </div>
    );
};

export default MyOrders;
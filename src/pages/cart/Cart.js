import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
const Cart = ({total,setTotal,setProductInfo}) => {
    const [cart,setCart] = useState([]);
    const {user} = useAuth();
    const history = useHistory();
    useEffect(()=>{
        const url = `https://afternoon-badlands-69676.herokuapp.com/cart/${user.email}`
        fetch(url)
        .then(res => res.json())
        .then(data => setCart(data))
    },[user.email]);
    const quantityPlus = (id)=>{
        const remain = cart.filter(r =>{
          if(r._id === id){
            r.product.quantity +=1;
          }
          return {r}
        })
        setCart(remain)
      }
      const quantityMinus = (id)=>{
        const remain = cart.filter(r =>{
          if(r._id === id){
            if(r.product.quantity < 2){
              r.product.quantity = 1;
            }else{
              r.product.quantity -=1;
            
            }
            
          }
          return {r}
        })
        setCart(remain)
      }
   
      useEffect(()=>{
        let total = 0;
        cart.map(order =>{
           total +=  order.product.quantity * parseInt(order.product.Price);
          return total;
        })
        setTotal(total)
      },[cart,setTotal])
      const deleteCart =(id)=>{
          const url = `https://afternoon-badlands-69676.herokuapp.com/cartdelete/${id}`;
          fetch(url,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(data => {if(data.deletedCount){
            const remaining = cart.filter(cart => cart._id !== id)
            setCart(remaining)
        }})
      };
      const confirmOrder =()=>{
        setProductInfo(cart);
        localStorage.setItem('product',JSON.stringify(cart));
        localStorage.setItem('total',JSON.stringify(total))
        if(cart){
          history.replace('/address')
        }
      }
    return (
        <div>
           {
           cart.length === 0 ? <h3 style={{marginTop:'200px'}}>No Cart</h3>: <> <TableContainer component={Paper}>
           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {cart.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" width='50' scope="row">
                  <img src={row.product.imageUrl} width="200" alt="" />
                </TableCell>
                <TableCell >
                    <p>{row.product.name}</p>
                    <small>${row.product.Price}</small>
                </TableCell>
                <TableCell>  
                <Button size="large" onClick={()=>quantityMinus(row._id)}>-</Button> 
                {row.product.quantity} 
                <Button size="large" onClick={()=>quantityPlus(row._id)}>+</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={()=>deleteCart(row._id)} startIcon={<DeleteIcon />}>
                  Remove
                  </Button></TableCell>
              </TableRow>
            ))}
            </TableBody>
             </Table>
           </TableContainer>
            <div style={{textAlign:'right',marginRight:'60px',marginBottom:'100px'}}>
            <h3 style={{marginRight:'10px'}}>Total ${total}</h3>
            <Button variant="outlined" onClick={confirmOrder} >Confirm Order</Button>
            </div>
           </>
         }
        </div>
    );
};

export default Cart;
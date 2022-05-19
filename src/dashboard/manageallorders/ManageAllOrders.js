import React,{useState,useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const ManageAllOrders = () => {
    const [allOrders,setAllOrders] = useState([]);
    const [status,setStatus] = useState('');
    const {idToken} = useAuth();
    useEffect(()=>{
        fetch('https://afternoon-badlands-69676.herokuapp.com/manageallorders',{
            headers:{
                'authorization':`Bearer ${idToken}`
              }
        })
        .then(res => res.json())
        .then(data => setAllOrders(data))
    },[idToken]);
    const deleteOrder =(id) =>{
      const url = `https://afternoon-badlands-69676.herokuapp.com/deleteorder/${id}`;
      fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
      .then(data => {
        if(data.deletedCount){
          const remaining = allOrders.filter(order => order._id !== id)
           setAllOrders(remaining)
        }
      })
    }
    const orderStatus =[
      'pending',
      'confirmed'
    ]
    const handleChange =(e)=>{
     setStatus(e.target.value)
    }
    console.log(allOrders)
    return (
        <div>
            <h3>Manage All Orders</h3>
            {
              allOrders.length === 0 ? <CircularProgress></CircularProgress>:
              <TableContainer component={Paper} sx={{overflow:'auto'}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.address.name}
              </TableCell>
              <TableCell>{row.address.email}</TableCell>
              <TableCell>
                <span style={{fontWeight:'bold'}}>City</span> :{row.address.city}
                <br />
                <span style={{fontWeight:'bold'}}>Street</span> : {row.address.street}   
                <br />           
                <span style={{fontWeight:'bold'}}>Phone</span> : {row.address.phone}</TableCell>
              <TableCell>{
                row.products.map(p =><div key={p._id} style={{display:'flex'}}>
                  <div>
                  <img src={p?.product?.imageUrl} width="50" alt="" />
                  </div>
                 <div>
                 <small>{p?.product?.name}</small>
                  <br />
                  <small>${p?.product?.Price} x {p?.product?.quantity}</small>
                  <br />
                 </div>
                </div>
                )
                }</TableCell>
              <TableCell>
              <TextField
                  id="standard-select-currency-native"
                  select
                  label="Status"
                  value={status}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
        >
          {orderStatus.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
              </TableCell>
              <TableCell>${row.total}</TableCell>
              <TableCell>{row.paymentType}</TableCell>
              <TableCell><IconButton aria-label="delete" onClick={()=>deleteOrder(row._id)} size="large">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton></TableCell>
                                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            }
        </div>
    );
};

export default ManageAllOrders;
import React,{useState,useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ManageAllOrders = () => {
    const [allOrders,setAllOrders] = useState([]);
    const {idToken} = useAuth();
    useEffect(()=>{
        fetch('http://localhost:5000/manageallorders',{
            headers:{
                'authorization':`Bearer ${idToken}`
              }
        })
        .then(res => res.json())
        .then(data => setAllOrders(data))
    },[idToken])
    return (
        <div>
            <h3>Manage All Orders</h3>
            <TableContainer component={Paper} sx={{overflow:'auto'}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.product.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">${row.product.Price}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default ManageAllOrders;
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ManageUsers = () => {
    const [users,setUsers] = useState([]);
    const [matchedUser,setMatchedUser] = useState([]);
    const {user,idToken} = useAuth();
    useEffect(()=>{
        const url = `http://localhost:5000/allusers/${user.email}`
        fetch(url,{
            headers: {
                'Content-Type': 'application/json',
                'authorization':`Bearer ${idToken}`
              },
        }).then(res => res.json())
        .then(data => {
          setMatchedUser(data)
          setUsers(data)})
    },[user.email,idToken]);
    const handleSearch = (e)=>{
      const searchText = e.target.value
      const foundUser = users.filter(user => user.email.toLowerCase().includes(searchText.toLowerCase()));
      setMatchedUser(foundUser);
    };
    return (
        <div>
           <h3>Manage Users</h3> 
           <TextField 
           id="standard-basic"
          label="Search An User"
          onChange={handleSearch}
          sx={{width:'80%',my:3}}
          variant="standard" />

            <TableContainer component={Paper} sx={{overflow:'auto'}}>
               <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                 <TableHead>
                   <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell>Email</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {matchedUser.map((user) => (
                     <TableRow
                       key={user._id}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                       <TableCell component="th" scope="row">
                         {user.name}
                       </TableCell>
                       <TableCell>{user.email}</TableCell>
                                         
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
        </div>
    );
};

export default ManageUsers;
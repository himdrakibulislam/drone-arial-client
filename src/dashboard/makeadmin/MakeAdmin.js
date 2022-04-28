import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth'
const MakeAdmin = () => {
    const [adminEmail,setAdminEmail] = useState('');
    const {idToken} = useAuth();
    const handleMakeAdmin = (e)=>{
        e.preventDefault();
       const email = {adminEmail}
       fetch('http://localhost:5000/user/admin',{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization':`Bearer ${idToken}`
              },
              body:JSON.stringify(email)
        })
        .then(res => res.json())
        .then(data =>console.log(data))
    }
    const handleSubmitEmail =(e)=>{
        setAdminEmail(e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleMakeAdmin} >
            <TextField
                sx={{width:'30%'}}
                id="standard-basic"
                name="email"
                type="email"
                label="Email"
                onChange={handleSubmitEmail}
                variant="standard" />
                <br />
                <br />
                <Button type='submit' sx={{width:'30%'}} variant="contained">Make Admin</Button>
            </form>
        </div>
    );
};

export default MakeAdmin;
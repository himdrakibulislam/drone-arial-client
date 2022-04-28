import { Alert, Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import login from '../../images/register.jpg'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
const Register = () => {
    const {registerUser,isLoading,err,user}  = useAuth();
    const [loginData,setLoginData] = useState({});
    const histoy = useHistory()
    const handleLoginSubmit = (e)=>{
        e.preventDefault();
    }
    const handleOnblur = (e)=>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData}
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleRegister = () =>{
        registerUser(loginData.email,loginData.password,loginData.name,histoy);
    }
    return (
        <div>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Box sx={{marginBottom:'50px'}}>
                <h3>Register Now</h3>
                <form onSubmit={handleLoginSubmit}>
                <TextField 
                sx={{width:'50%'}}
                id="standard-basic"
                name="name"
                onChange={handleOnblur}
                type="text"
                label="Enter Name"
                variant="standard" />
                <br />
                <br />
                <TextField 
                sx={{width:'50%'}}
                id="standard-basic"
                name="email"
                onChange={handleOnblur}
                type="email"
                label="Enter Email"
                variant="standard" />
                <br />
                <br />
                <TextField 
                sx={{width:'50%'}}
                id="standard-basic"
                name="password"
                onChange={handleOnblur}
                type="password"
                label="Enter Password"
                variant="standard" />
                <br />
                <br />
                <Button sx={{width:'50%'}} onClick={handleRegister} type='submit' variant="outlined">Register</Button>
                </form>
                <br />
                <Link to="/login"><Button  sx={{width:'50%'}}  variant="text">Already Have An Account ?</Button></Link>
                <br />
            
                {isLoading&& <CircularProgress />}
            {err && <Alert severity="error">{err}</Alert>}
            {user?.email && <Alert severity="success">Registration is Successful</Alert>}
                
            </Box>
           
            </Grid>
            <Grid item xs={12} md={6}>
                <img src={login} style={{ width: '100%' }}  alt="" />
            </Grid>
            </Grid>
            
        </div>
    );
};

export default Register;
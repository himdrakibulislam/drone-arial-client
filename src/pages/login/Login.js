import { Alert, Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import login from '../../images/login.jpg'
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Login = () => {
    const {user,err,isLoading,signInWithGoogle,loginUser}  = useAuth();
    const [loginData,setLoginData] = useState({});
    const handleLoginSubmit = (e)=>{
        e.preventDefault();
    }
    const histoy = useHistory();
    const location = useLocation();
    const handleOnblur = (e)=>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData}
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleGoogleSignIn = ()=>{
        signInWithGoogle(histoy,location)
    }
    const handleLogin =()=>{
        loginUser(loginData.email,loginData.password,histoy,location)
    }
    return (
        <div>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Box sx={{marginBottom:'50px'}}>
                <h3>Login</h3>
                <form onSubmit={handleLoginSubmit}>
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
                <Button onClick={handleLogin} sx={{width:'50%'}} type='submit' variant="outlined">Login</Button>
                </form>
                <br />
                <Link to="/register"><Button  sx={{width:'50%'}}  variant="text">New User ? Register</Button></Link>
                <br />
                <br />
                <Button sx={{width:'50%'}}  onClick={handleGoogleSignIn} variant="outlined"><GoogleIcon sx={{marginRight:'20px'}}></GoogleIcon> GOOGLE</Button>
                
            </Box>
            {isLoading&& <CircularProgress />}
            {err && <Alert severity="error">{err}</Alert>}
            {user?.email && <Alert severity="success">Login Successfully</Alert>}
            </Grid>
            <Grid item xs={12} md={6}>
                <img src={login} style={{ width: '100%' }}  alt="" />
            </Grid>
            </Grid>
           
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import './login.css'
const Login = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [check,setCheck] = useState();
    const {err,SignInUsingGoogle,profileDetails,signUpUsingEmailPassword,signInUsingEmailPassword} = useAuth();
    const handleName = (e) =>{
        setName(e.target.value)
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    // 
    // 
    const handleSubmit = (e) =>{
        e.preventDefault();
        {check ? signInUsingEmailPassword(email,password)
            : signUpUsingEmailPassword(email,password)
            profileDetails(name)
        }
    }
    const handleCheck = (e) =>{
       setCheck(e.target.checked)
    }
    return (
        <div className='login-style '>
            <div className='mt-5 text-black'>
                {check? <h3>Sign In</h3> :<h3>Registration Now</h3>}
                    <Form onSubmit={handleSubmit}>
        {check ? <br /> :<Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>
            <Form.Control type="text" onChange={handleName} placeholder="Enter Name" />
        </Form.Group>}
        <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={handleEmail} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={handlePassword} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <p className='text-danger'>{err}</p>
            <Form.Check type="checkbox" onChange={handleCheck} className='text-white' label="Already Register" />
        </Form.Group>
        <button type='submit' className='btn-success rounded'>Submit</button>
        </Form>
        <button onClick={SignInUsingGoogle} className='btn btn-dark my-3'>Sign In With Google</button>
            </div>
        </div>
    );
};

export default Login;
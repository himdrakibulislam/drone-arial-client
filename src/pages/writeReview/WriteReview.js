import { Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
const WriteReview = () => {
    const {user} = useAuth();
    const [review,setReview] = useState({});
    const history = useHistory();
    const handleReviewOnChange =(e)=>{
        const field= e.target.name;
        const value = e.target.value;
        const newReview = {...review}
        newReview[field] = value;
        setReview(newReview);
    }
    const submitReview =(e)=>{
        e.preventDefault();
        const name = user.displayName;
        const email = user.email;
        const reviewDetails = {
            name,
            email,
            ...review
        }
        fetch('http://localhost:5000/review',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify(reviewDetails)
        }).then(res => res.json())
        .then(data => {if(data.insertedId){
            history.replace('/')
        }})
    }
    return (
        <div>
           <h3>Write Review</h3> 
           <form onSubmit={submitReview} >
           <TextField
                sx={{width:'50%'}}
                id="standard-basic"
                name="rating"
                type="number"
                onChange={handleReviewOnChange}
                label="Rating Star"
                variant="standard" />
                <br />
                <br />
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    onChange={handleReviewOnChange}
                    name="review"
                    placeholder="Review"
                    style={{ width: "50%" }}
                    />
                    <br />
                    <br />
                    <Button type="submit" style={{ width: "50%" }} variant="outlined">Send Review</Button>
           </form>
        </div>
    );
};

export default WriteReview;
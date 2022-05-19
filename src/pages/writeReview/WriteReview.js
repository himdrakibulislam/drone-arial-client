import { Button, Rating, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
const WriteReview = () => {
    const {user} = useAuth();
    const [rating, setRating] = React.useState(0);
    const [reviewDescription,setReviewDescription] = useState('');
    const history = useHistory();
    const submitReview =(e)=>{
        e.preventDefault();
        const name = user.displayName;
        const email = user.email;
        const reviewDetails = {
            name,
            email,
            rating: rating,
            review : reviewDescription
        }
        fetch('https://afternoon-badlands-69676.herokuapp.com/review',{
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

           <Rating
                name="rating"
                value={rating}
                onChange={(event,newValue) => {
                setRating(newValue);
                }}
      />
           
                <br />
                <br />
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    onChange={e=>setReviewDescription(e.target.value)}
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
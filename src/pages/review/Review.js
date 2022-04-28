import { Card, CardActions, CardContent, Grid, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
const Review = () => {
    const [value, setValue] = React.useState(2);
    const [reviews,setReviews] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/allreviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])
    return (
        <div>
            <h3>Customer Reviews</h3>
            <Grid container spacing={2}>

                {
                    reviews.map(review=> <Grid key={review._id} item xs={12} md={4}>
                         <Card sx={{ maxWidth: 345 }}>
                         <PersonIcon></PersonIcon>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                           {review.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                            <Rating
                                name="simple-controlled"
                                value={parseInt(review.rating)}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                            />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {
                                review.review
                            }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                        </Card>
                    </Grid> )
                }
           
            </Grid>

        </div>
    );
};

export default Review;
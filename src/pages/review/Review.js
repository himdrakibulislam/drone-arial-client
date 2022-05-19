import { Card, CardActions, CardContent, CircularProgress, Grid, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Swiper, SwiperSlide } from 'swiper/react';

const Review = () => {
    const [reviews,setReviews] = useState([]);
    useEffect(()=>{
        fetch('https://afternoon-badlands-69676.herokuapp.com/allreviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])
    return (
        <div>
            <h3>Customer Reviews</h3>

        <Swiper
      spaceBetween={5}
      slidesPerView={2}
    >

       {
            reviews.length === 0 ? <CircularProgress /> : <Grid container spacing={2}>

            {
                reviews.map(review=><SwiperSlide key={review._id}><Grid item xs={12} md={4}>
                     <Card sx={{ maxWidth: 345 }}>
                     <PersonIcon></PersonIcon>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                       {review.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                    
                        <Rating name="read-only" value={parseInt(review.rating)}  readOnly />
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
                </Grid> </SwiperSlide> )
            }
       
        </Grid>
        }
    </Swiper>



    
        </div>
    );
};

export default Review;
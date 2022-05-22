import { Card, CardActions, CardContent, CircularProgress, Rating, Typography } from '@mui/material';
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
      slidesPerView={3}
    >

       {
            reviews.length === 0 ? <CircularProgress /> : <div>

            {
                reviews.map(review=><div key={review._id}><SwiperSlide >
                     <Card sx={{ maxWidth: 345 }}>
                     <PersonIcon></PersonIcon>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                       {review.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                    
                        <Rating name="read-only" value={parseInt(review.rating)}  readOnly />
                        </Typography>
                        <Typography variant="body2" sx={{textAlign:'justify'}} color="text.secondary">
                        {
                            review.review
                        }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        
                    </CardActions>
                    </Card>
                 </SwiperSlide>
                 </div>  )
            }
            </div>
    
        }
    </Swiper>



    
        </div>
    );
};

export default Review;
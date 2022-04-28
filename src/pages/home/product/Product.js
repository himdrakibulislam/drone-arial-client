import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
    return (
        <div>
            <Grid item >
            <Card sx={{ maxWidth: 345 ,my:2,marginRight:'5px'}}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {
             product.name
         }
        </Typography>
       
        <Typography variant="body2" color="text.secondary">
         {
             product.description.slice(0,250)
         }
                </Typography>
        <Typography gutterBottom variant="h6" component="div">
         USD ${
             product.Price
         }
        </Typography>
            </CardContent>
            <CardActions>
            <Link style={{textDecoration:'none'}} to={`/placeorder/${product._id}`} > 
            <Button size="small">Buy Now</Button>
            </Link>
            </CardActions>
            </Card>
        
               </Grid>
        </div>
    );
};

export default Product;
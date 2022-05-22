import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
const Product = ({product}) => {
    const {user} = useAuth();
    const history = useHistory();
    const addToCart =(product)=>{
        const cartInfo = {
            email: user.email,
            product: product
        }
       if(user.email){
        fetch('https://afternoon-badlands-69676.herokuapp.com/cart',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(cartInfo)
        })
        .then(res => res.json())
        .then(data => {})
       }else{
           history.replace('/login')
       }
    }
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
       
        <Typography variant="body2" style={{textAlign:'justify'}} color="text.secondary">
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
            <Link style={{textDecoration:'none',marginRight:'80px'}} to={`/placeorder/${product._id}`} > 
            <Button size="small">Buy Now</Button>
            </Link>
            
            <Button onClick={()=> addToCart(product)} size="small">Add To Cart</Button>
            
            </CardActions>
            </Card>
        
               </Grid>
        </div>
    );
};

export default Product;
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card,CardContent,CardMedia,CardActions,Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../../shared/footer/Footer';
const Explore = () => {
    const [allProducts,setAllProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/allProducts')
        .then(res => res.json())
        .then(data => setAllProducts(data))
    },[])
    return (
        <div>
            <Container>
            <Typography variant='h4'>
                Explore 
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                allProducts.map(product => <Grid item key={product._id} >
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
                
                       </Grid>)
            }
            </Grid>
            <Footer></Footer>
            </Container>
        </div>
    );
};

export default Explore;
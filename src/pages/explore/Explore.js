import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card,CardContent,CardMedia,CardActions,Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../../shared/footer/Footer';
const Explore = () => {
    const [allProducts,setAllProducts] = useState([]);
    useEffect(()=>{
        fetch('https://afternoon-badlands-69676.herokuapp.com/allProducts')
        .then(res => res.json())
        .then(data => setAllProducts(data))
    },[])
    return (
        <div>
            <Container>
            <Typography variant='h4' sx={{my:6}}>
                Explore 
            </Typography>
            {
                allProducts.length === 0 ?<div sx={{my:5}}>< CircularProgress/> </div> :  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
                <Link style={{textDecoration:'none'}} to={`/placeorder/${product._id}`} > 
                <Button size="small">Add To Cart</Button>
              </Link>
                  </CardActions>
                </Card>
                    
                           </Grid>)
                }
                </Grid> 
            }
            <Footer></Footer>
            </Container>
        </div>
    );
};

export default Explore;
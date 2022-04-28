import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Grid container spacing={3} sx={{backgroundColor:'black',px:5,py:6,color:'white',marginTop:'10px'}}>
        <Grid item xs={12} md={4}>
        <Typography variant="h5" sx={{textAlign:'cenetr'}} component="h5">
           Address
        </Typography>
        <Typography variant="p" sx={{my:2,textAlign:'cenetr'}} component="p">
           Bangladesh
        </Typography>
        <Typography variant="p" sx={{textAlign:'cenetr'}} component="p">
           Cumilla
        </Typography>

        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h5">
            About Us
        </Typography>
          <Typography variant="p" component="p">
            We Want to provide the best product
        </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        <Typography variant="h5" component="h5">
           Subsscribe
        </Typography>
        <TextField id="outlined-basic" label="Subscribe" variant="outlined" />

        </Grid>
      </Grid>
    );
};

export default Footer;
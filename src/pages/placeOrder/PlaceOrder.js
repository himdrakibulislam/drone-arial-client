import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../../shared/footer/Footer';

const PlaceOrder = ({total,setTotal,setProductInfo}) => {
    const {productId} = useParams();
    const [product,setProduct] = useState({});
    const history = useHistory();
    const {name,imageUrl,description,Price,quantity} = product;
    let [quantitys,setQuantity] = useState();
    useEffect(()=>{
        const url = `https://afternoon-badlands-69676.herokuapp.com/placeorder/${productId}`
        fetch(url)
        .then(res => res.json())
        .then(data =>{ setProduct(data)
        setQuantity(data.quantity);
        setTotal(data.Price)
        })
    },[productId,setTotal])
   
   
    const quantityPlus =()=>{
        let plus = quantitys +=1
        setQuantity(plus);
        product.quantity = plus;
         const total = product.quantity * product.Price
        setTotal(total)
        setProduct(product)
    }
    const quantityMinus =()=>{
        if(quantitys<2){
            setQuantity(1);
            product.Price = product.quantity * product.Price
            setProduct(product);
        }else{ 
        let minus = quantitys -=1
        setQuantity(minus);
        product.quantity = minus;
        const total = product.quantity * product.Price;
        setTotal(total);
        setProduct(product);
        }
    };
    const confirmOrder = ()=>{
        const p ={product:product }
        const confirmProduct = [p]
        setProductInfo(confirmProduct);
        localStorage.setItem('product',JSON.stringify(confirmProduct));
        if(product){
            history.replace('/address')
        }
    }
    return (
        <Container sx={{my:10}}>
       
               <Box>
               <img src={imageUrl} width="80%" height="45%" alt="" />
                <h2>{name}</h2>
                <h4>USD ${Price}</h4>
                <p style={{textAlign:'justify'}}>{description}</p>
                <p> Quantity 

                <Button size="large" onClick={quantityMinus} >-</Button> 
                     {quantity}
                     <Button size="large" onClick={quantityPlus}>+</Button> 
                     </p> 
                <h4>TOTAL PRICE USD ${total}</h4>
                <Button onClick={confirmOrder} sx={{width:'90%',my:3}} variant="outlined">Confirm Order</Button>
               </Box>
            <Footer></Footer>
            </Container>
    );
};

export default PlaceOrder;
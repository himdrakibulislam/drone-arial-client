import { Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react';
const AddProduct = () => {
    const handleAddSubmit = (e)=>{
        e.preventDefault();
        const addProduct ={
            ...productData,
            imageUrl
        }
        fetch('http://localhost:5000/addProduct',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify(addProduct)
        }).then(res => res.json())
        .then(data => {if(data.insertedId){
            alert("Product Added Successfully");
        }})
    }
    const [productData,setProductData] = useState({});
    const [imageUrl,setImageUrl] = useState('');
    const handleProductOnBlur = (e)=>{
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = {...productData}
        newProductData[field] = value;
        setProductData(newProductData)
    }
    const uploadImage = (file) =>{
        const imageForm = new FormData()
      imageForm.append("file",file)
      imageForm.append("upload_preset","qc29dys6")
      fetch("https://api.cloudinary.com/v1_1/dae6oihks/image/upload",{
          method:'POST',
          body: imageForm,
      })
      .then(res => res.json())
      .then(data =>setImageUrl(data.secure_url))
    }
    return (
        <div>
            <h4>Add Product</h4>
            <form style={{marginTop:'20px',marginBottom:'100px'}} onSubmit={handleAddSubmit} >
            <TextField
                sx={{width:'30%'}}
                id="standard-basic"
                name="name"
                type="text"
                onChange={handleProductOnBlur}
                label="Product Name"
                variant="standard" />
                <br />
                <br />
            <TextField
                sx={{width:'30%'}}
                id="standard-basic"
                name="Price"
                type="number"
                onChange={handleProductOnBlur}
                label="Product Price"
                variant="standard" />
                <br />
                <br />
            <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                onBlur={handleProductOnBlur}
                name="description"
                placeholder="Descriptions"
                style={{ width: '30%' }}
                />
                <br />
                <br />
                 <input type="file"  onChange={(e)=>uploadImage(e.target.files[0])}  name="" id="" />
                 <br />
                 <br />
                 {
                     imageUrl?<Button type='submit'  sx={{width:'30%'}} variant="contained">Add Product</Button> :<Button type='submit' disabled sx={{width:'30%'}} variant="contained">Add Product</Button>
                 }
                 
            </form>
        </div>
    );
};

export default AddProduct;
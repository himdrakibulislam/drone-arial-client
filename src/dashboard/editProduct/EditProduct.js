import { Button, CircularProgress, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams,useHistory } from 'react-router-dom';
import './editProduct.css'
const EditProduct = () => {
    const {id}  = useParams();
    const [product,setProduct] = useState({});
    const [name, setName] = useState('');
    const [price,setPrice] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [imageId,setImageId] = useState('');
    const [description, setDescription] = useState('');
    const [deletedImage,setDeletedImage] = useState('');
    const [uploadingImage,setUploadingImage] =useState(false);
    const history = useHistory();
    useEffect(()=>{
        const url = `https://afternoon-badlands-69676.herokuapp.com/placeorder/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
          setProduct(data)
          setName(data.name);
          setPrice(data.Price);
          setImageUrl(data.imageUrl);
          setImageId(data.imageId);
          setDescription(data.description)
        })
    },[id]);
    
      const uploadImage = (file) =>{
        setUploadingImage(true)
        const imageForm = new FormData()
      imageForm.append("file",file)
      imageForm.append("upload_preset","qc29dys6")
      fetch("https://api.cloudinary.com/v1_1/dae6oihks/image/upload",{
          method:'POST',
          body: imageForm,
      })
      .then(res => res.json())
      .then(data => {
          setImageUrl(data.secure_url)
          setImageId(data.public_id)
          setUploadingImage(false);
      })
    }
    const handleSubmit =(e)=>{
      e.preventDefault();
      const editedProduct ={
        name:name,
        Price:price,
        imageId:imageId,
        imageUrl:imageUrl,
        description: description,
        quantity:1
    }
    const url = `https://afternoon-badlands-69676.herokuapp.com/updateproduct/${id}`;
    fetch(url,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify(editedProduct)
        }).then(res => res.json())
        .then(data => {if(data.modifiedCount){
          alert('Product Edited successfully')
          history.replace('/dashboard/manageproducts')
        }})
  }
  const deleteImage = (id)=>{
    const url = `https://afternoon-badlands-69676.herokuapp.com/deleteimage/${id}`
      fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data => setDeletedImage(data.result))
  }
    return (
        <div>
          {
            product.name ?<><h3>Edit {product.name}</h3>
            <form onSubmit={handleSubmit} className="edit-style">
              <label className='label-style'>Product Name</label>
              <br />
                <input type="text"
                defaultValue={product.name}
                onChange={e=> setName(e.target.value)}
                />
                <br />
              <label className='label-style'>Product Price</label>
              <br />
                <input type="text"
                defaultValue={product.Price}
                onChange={e=> setPrice(e.target.value)}
                />
                <br />
              <label className='label-style'>Product Description</label>
              <br />
              <br />
                <textarea 
                name="description" 
                id="" 
                cols="80"
                rows="10"
                defaultValue={product.description}
                onChange={e=> setDescription(e.target.value)}
                ></textarea>
                <br />
                <label>Product Image </label>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Paper sx={{width:'50%'}}>
                    
                    {
                      deletedImage ?<>
                      <h4>Edited Image</h4>
                      <img src={imageUrl}  style={{border:'1px solid black',margin:'10px'}}  width="30%" alt="" />
                      </>:<>
                      <CancelIcon onClick={()=>deleteImage(product.imageId)}></CancelIcon>
                      <img style={{border:'1px solid black',margin:'10px'}} src={product.imageUrl} width="30%" alt="" />
                      </>
                    }
                </Paper>
                </div>
                <br /> 
                <label >Upload Image</label>
                <br />
                <input type="file"  onChange={(e)=>uploadImage(e.target.files[0])}  name="" id="" />
                <br />
                <br />
                {
                  uploadingImage ? <Button disabled type="submit" sx={{width:'50%'}} variant='contained'>Submit</Button>:<Button type="submit" sx={{width:'50%'}} variant='contained'>Submit</Button>
                }
            </form> </> : <CircularProgress/>
          }
            
        </div>
    );
};

export default EditProduct;
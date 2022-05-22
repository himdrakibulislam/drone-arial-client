import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const ManageReview = () => {
    const [review,setReviews]= useState([])
    useEffect(()=>{
        fetch('https://afternoon-badlands-69676.herokuapp.com/allreviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[]);
    const featuredReview = (id) =>{
        const url = `https://afternoon-badlands-69676.herokuapp.com/featuredreview/${id}`;
        fetch(url,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        }).then(res => res.json())
        .then(data => {})
    }
    const deleteReview =(id)=>{
       const url = `https://afternoon-badlands-69676.herokuapp.com/deletereview/${id}`;
       fetch(url,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    }).then(res => res.json())
    .then(data =>{
        if(data.deletedCount){
            const remaining = review.filter(r => r._id !== id);
            setReviews(remaining);
        }
    })
    }
    return (
        <div>
            <h3>Review {review.length}</h3>
            {
                review.map(r =><div key={r._id} style={{display:'flex',border:'1px solid black',marginBottom:'10px'}}>
                    <div style={{margin:'100px'}}>
                        <AccountCircleIcon/>
                    </div>
                    <div>
                        <h3 style={{textAlign:'left'}}>{r.name}</h3>
                        <h4 style={{textAlign:'left'}}>{r.email}</h4>
                        <p style={{textAlign:'left'}}>{r.review}</p>
                        <Rating style={{display:'flex'}} name="read-only" value={parseInt(r.rating)} readOnly />
                        <br />
                        <Button variant='contained' onClick={()=>featuredReview(r._id)} style={{display:'flex',marginRight:'5px'}}>Featured</Button>
                        <br />
                        <DeleteIcon onClick={()=>deleteReview(r._id)}  style={{display:'flex',margin:'5px'}} ></DeleteIcon>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ManageReview;
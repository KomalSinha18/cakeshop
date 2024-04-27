import React from 'react'
import axios from 'axios'
import { Container, Paper, Typography, TextField, Button} from '@mui/material'
import { useState } from 'react'
function AddProduct() {

  const [product, setProduct] = useState({title:"",desc:'',price:0})
  const [image, setImage] = useState("")

  const handleChange = (key) => {
    key.preventDefault();
    setProduct({ ...product, [key.target.id]: key.target.value });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post("http://localhost:5000/api/v1/product/add",{title:product?.title, desc:product?.desc, price:product?.price,image})
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <>
     <Container component={"main"} maxWidth="xs"
   sx={{
    height:"510px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
   }}>

<Paper 
    elevation={3}
     sx={{
      padding:4,
      display:"flex",
       flexDirection:"column", 
       alignItems:"center"}}>
        
        <Typography variant='h5' color="#de4276">Add Product</Typography>
  <div style={{
    width:"100%",
    marginTop:"1rem"
  }}

  >
    <input type="file" name="" id="" accept="image/*" style={{}} onChange={handleImageChange}/>
  <TextField
    required
    fullWidth
    label="Enter title"
    margin='normal'
    variant='outlined'
   value={product?.title}
   id='title'
   onChange={handleChange}
  />
  <TextField
    required
    fullWidth
    label="Enter description"
    type='string'
    margin='normal'
    variant='outlined'
    value={product?.desc}
    id='desc'
    onChange={handleChange}
  />
  
  <TextField
    required
    fullWidth
    label="Enter price"
    type='number'
    margin='normal'
    variant='outlined'
    value={product?.price}
    id='price'
    onChange={handleChange}
  />

  <Button
  sx={{marginTop:"1rem"}}
    variant='contained'
    color='primary'
  onClick={handleAddProduct}
    fullWidth
  >
    add Product
  </Button>
  

  </div>



        </Paper>
   </Container>
    
    </>
  )
}

export default AddProduct
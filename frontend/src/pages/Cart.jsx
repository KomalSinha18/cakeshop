import React from 'react'
import axios from 'axios';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid, TextField, Box} from "@mui/material";
import { useState,useEffect } from "react";
import PlaceIcon from '@mui/icons-material/Place';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import toast from 'react-hot-toast';

function Cart({setUser, user}) {

  const [totalPrice, setTotalPrice] = useState(0)
  const [address, setAddress] = useState("")

const removeFromCartHandler = async (id) => {
  try {
    const response = await axios.get(`/api/v1/product/removeFromcart/${id}`,{withCredentials:true})
    setUser(response?.data?.user)
    toast.success("Product Removed From Cart");
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message);
  }
}

const orderPlaceHandler = async (id) => {
  try {
    const response = await axios.post(`/api/v1/order/placed`,{totalPrice,address},{withCredentials:true})
    setUser(response?.data?.user)
    toast.success("Order Placed");
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message);
  }
}

const calculateTotal = () => {
  let total = 0
  for(let i = 0; i<user?.cart?.length; i++){
    total += user?.cart?.[i]?.price
  }
  setTotalPrice(total)
} 

useEffect(() => {
  calculateTotal()
}, [user?.cart])

  return (
   <>
   <Typography  variant="h4" gutterBottom sx={
{
    textAlign:"center",
    mt:2,
    p:2,
    color:"#b52364e3",
    fontFamily:"fantasy",
    fontWeight:"light"
}
   }>Items Added
    <Grid container spacing={0} item gap={3} >
    {
      user?.cart?.map((product) => (
        <Card sx={{ maxWidth: 345,
          p:2,
          mt:"20px",
          }} key={product.id}>
            <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={product?.img?.url}
                alt="cake"
                sx={{objectFit:"cover", objectPosition:"center", width:"100%", height:"250px"}}
              />
              <CardContent sx={{p:2, minHeight:"180px"}}>
                <Typography gutterBottom variant="h5" component="div"sx={{
                  fontFamily:"italic"
                }}>
                 {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.desc}
                </Typography>
                <Typography variant="h6"  gutterBottom sx={{
                  mt:"15px",
                  fontSize:"32px"
                }}>
                 ₹ {product.price}
                 
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={()=>removeFromCartHandler(product?._id)} size="small" color="primary" sx={{
                  color:"#e80c27fc"
              }}>
                Remove
              </Button>
            </CardActions>
          </Card>
      )
    
    )
      
    }
    </Grid>
    </Typography>
 
  <Typography variant="h6" gutterBottom sx={
{
    // textAlign:"center",
    mt:1,
    ml:5,
    p:2,
    color:"#b52364e3",
    fontFamily:"unset",
    fontWeight:"bold"
}}>
    Delivery Details
    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
        <PlaceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField value={address} onChange={(e)=>setAddress(e.target.value)} id="input-with-sx" label="Enter your address" variant="standard" sx={{
            width:"380px"
        }} />
      </Box>
   </Typography>
  
   <Box>
    <Typography variant="h6" gutterBottom sx={
{
    // textAlign:"center",
    mt:1,
    ml:5,
    p:2,
    color:"#b52364e3",
    fontFamily:"unset",
    fontWeight:"bold"
}}>Total Amount: {totalPrice}</Typography>
  <Button onClick={orderPlaceHandler} disabled={totalPrice === 0} sx={{
     display: 'flex', alignItems: 'flex-end',
     ml:8,
     p:1,
     mb:2,
     color:"#DB5D87",
     borderColor:"#D7386E",
     "&:hover":{
      backgroundColor:"#EFB0C6",
      border:"none",
      
     }
  }} variant="outlined" startIcon={<ShoppingBagIcon />}>
  Place order
</Button>
   </Box>
   </>
  )
}

export default Cart
import React from 'react'
import { Container, Typography,Grid,CardActionArea, Paper } from '@mui/material'
import axios from 'axios'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState,useEffect } from 'react'
import  Moment from 'react-moment';


function MyOrders() {
  const [orders, setOrders] = useState([])

  const myOrders = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/order/myorders",{withCredentials:true})
        setOrders(response.data?.orders)
    } catch (error) {
        console.log(error);
    }
}

console.log(orders)

useEffect(() => {
  myOrders()
 }, [])
  return (
   <>
      <Container>
        { orders.map((order,index) => (

      <Typography variant="h6" gutterBottom  sx={{
        color:"#b52364e3",
    fontFamily:"fantasy",
    fontWeight:"light",
    
    p:2
      }}>
      Order {index+1}
      <Typography variant="subtitle1" gutterBottom sx={{
        color:"#b52364e3",
        fontFamily:"italic",
        fontWeight:"light",
        fontSize:"19px",
        
      }}>ordered On:<Moment format="YYYY/MM/DD">{order?.createdAt}</Moment></Typography>
      <Typography variant="subtitle1" gutterBottom sx={{
        color:"#b52364e3",
        fontFamily:"italic",
        fontWeight:"light",
        fontSize:"19px"
      }}>ordered Address: {order?.address}</Typography>
      <Typography variant="subtitle1" gutterBottom sx={{
        color:"#b52364e3",
        fontFamily:"italic",
        fontWeight:"light",
        fontSize:"19px"
      }}>Total Amount: {order?.totalPrice}</Typography>
      <Typography variant="subtitle1" gutterBottom sx={{
        color:"#b52364e3",
        fontFamily:"italic",
        fontWeight:"light",
        fontSize:"19px"
      }}>ordered Products:</Typography>
     <Paper elevation={3}>
     <Grid  container spacing={0} item gap={3} >
        { order?.products?.map((product) => (
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
              <CardContent sx={{p:2, minHeight:"60px"}}>
                <Typography gutterBottom variant="h5" component="div"sx={{
                  fontFamily:"italic"
                }}>
                 {product?.title}
                </Typography>
          
                <Typography variant="h6"  gutterBottom sx={{
                
        
                }}>
                 ₹ {product?.price}
                 
                </Typography>
              </CardContent>
            </CardActionArea>
        </Card>))
}
      </Grid>
     </Paper>
      </Typography>
      ))
}
      </Container>
   </>
  )
}

export default MyOrders
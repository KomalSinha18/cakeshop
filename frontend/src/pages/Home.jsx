import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Container} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home({setUser}) {
  const [products, setProducts] = useState([])

  const fetchProduct = async() => {
    try {
        const response = await axios.get("/api/v1/product/all")
  
        console.log(response);
        setProducts(response.data?.product)
    } catch (error) {
        console.log(error);
    }
}

const addToCartHandler = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/product/addtocart/${id}`,{withCredentials:true})
    setUser(response?.data?.user)
    toast.success("Product Added to Cart");
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message);
  }
}

console.log(products);
useEffect(() => {
 fetchProduct()
}, [])
  return (
<>
<Container maxWidth="lg" sx={{py:6, px:1}}>
    <Grid container spacing={0} item gap={3} fullWidth sx={{justifyContent:"center"}}>
    {
      products.map((product) => (
        <Card sx={{ maxWidth: 345,
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
              <Button fullWidth color="primary" 
              onClick={()=>addToCartHandler(product?._id)} 
              sx={{
                  background:"#e30369f0",
                  color:"white",
                  borderRadius:100,
                  mb:2,
                  "&:hover":{
                    backgroundColor:"pink"
                  }
              }}>
                Add to cart
              </Button>
            </CardActions>
          </Card>
      ))
    }


    </Grid>
    </Container>
</>

    
  );
}

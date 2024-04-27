import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import logo from "../../assets/logo.png"
function Footer() {
  return (
   <>
   <Box > 
    <Paper elevation={3} square sx={{
      height:"130px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}> <img style={{
      height:"100px",
      width:"auto",
      marginLeft:"40px",
      
    }} src={logo} alt="logo" />
      <Typography  sx={{
        textAlign:"center",
        p:4,
        color:"#CE527C",
        fontSize:"20px",
        fontFamily:"italic",

      }}>
      Baking memories, one bite at a time.🍰
      </Typography>

     
      
    </Paper>
   </Box>
   </>
  )
}

export default Footer
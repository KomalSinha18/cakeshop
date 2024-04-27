import React from 'react'
import { Container, Paper, Typography,Box, TextField, Button,Stack} from '@mui/material'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Register({setUser}) {
  let navigate = useNavigate({setUser})
    const [creds, setCreds] = useState({name:"",email:"",password:""})

   
    const handleChange = (key) => {
        key.preventDefault();
        setCreds({ ...creds, [key.target.id]: key.target.value });
      };
      const handleSignup = async (e) => {
        try {
          const response = await axios.post("http://localhost:5000/api/v1/user/register",creds, {withCredentials:true})
          console.log(response)
          setUser(response?.data?.user)
          toast.success(response?.data?.message)
    navigate("/")
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

  <Typography variant='h5' color="#de4276">Sign Up</Typography>
  <div style={{
    width:"100%",
    marginTop:"1rem"
  }}

  >
    <TextField
    required
    fullWidth
    label="name"
    margin='normal'
    variant='outlined'
    value={creds.name}
    id='name'
    onChange={handleChange}
  />
  <TextField
    required
    fullWidth
    label="email"
    margin='normal'
    variant='outlined'
    value={creds.email}
    id='email'
    onChange={handleChange}
  />
  <TextField
    required
    fullWidth
    label="Password"
    type='password'
    margin='normal'
    variant='outlined'
    onChange={handleChange}
    value={creds.password}
    id='password'
   
  />
  <Button
  sx={{marginTop:"1rem"}}
    variant='contained'
    color='primary'

    fullWidth
    onClick={handleSignup}
  >
    Sign Up
  </Button>
  
<Typography textAlign={'center'} m={"1rem"}>Or</Typography>
<Button
onClick={()=>navigate('/login')}
    variant='text'
    color='primary'
    fullWidth
  >
    Login Instead
</Button>
  </div>




        </Paper>

   </Container>
    </>
  )
}

export default Register
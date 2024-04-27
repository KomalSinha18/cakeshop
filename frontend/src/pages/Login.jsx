import { Container, Paper, Typography,Box, TextField, InputAdornment, Button,Stack} from '@mui/material'
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({setUser}) {
    let navigate = useNavigate()
    

const [creds, setCreds] = useState({email:"",password:""})
  
const handleChange = (key) => {
  key.preventDefault();
  setCreds({ ...creds, [key.target.id]: key.target.value });
};

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/login",creds, {withCredentials:true})
      console.log(response)
      setUser(response?.data?.user);
      toast.success(response?.data?.message);
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message);
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
  
    <Typography variant='h5' color="#de4276">Login</Typography>
   
    
     <div style={{
      width:"100%",
      marginTop:"1rem"
    }}
  
    >
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
      onClick={handleLogin}
    >
      Login
    </Button>
   
    
   <Typography textAlign={'center'} m={"1rem"}>Or</Typography>  
  
 
      <Button
  
  variant='text'
  color='primary'
  fullWidth
  onClick={()=>navigate('/register')}

>
  Sign Up Instead
</Button>

    </div>
    
  
  
  
  
          </Paper>
  
     </Container>
   
    </>
  )
}

export default Login
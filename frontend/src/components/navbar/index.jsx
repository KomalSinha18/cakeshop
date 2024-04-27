import * as React from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import logo from "../../assets/logo.png"


function Navbar({user}) {

  let navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/v1/user/logout",{withCredentials:true})
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppBar position="static" sx={{ background: "white" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ height: "auto", width: "100px", mr: 2 }}>
            <Link to='/'>
            <img src={logo} height="auto" width="auto" />
            </Link>
          </Box>
          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 3 }}
          >
            {/* <IconButton aria-label="cart">
        <ShoppingCartIcon />
      </IconButton> */}
         <Button
            onClick={()=>navigate('/myorders')}
              variant="outlined"
              sx={{
                color: "#e30369f0",
                fontFamily: "italic",
                border: "none",
                "&:hover": {
                  background: "lightpink",
                  border: "none",
                },
              }}

              startIcon={<LocalMallIcon />}
            >
               My Orders
            </Button>
            <Button
            onClick={()=>navigate('/cart')}
              variant="outlined"
              sx={{
                color: "#e30369f0",
                fontFamily: "italic",
                border: "none",
                "&:hover": {
                  background: "lightpink",
                  border: "none",
                },
              }}
              startIcon={<Badge badgeContent={user?.cart?.length} color="primary"><ShoppingCartIcon /></Badge>}
            >
              
              {/* <ShoppingCartIcon color="#e30369f0" /> */}
    
              My Cart
            </Button>
            {/* <Button variant="contained" size="small">
          Logout
        </Button> */}
            <Button variant="outlined"
            onClick={logoutHandler}
            sx={{
              border:"none",
              color: "#e80c27fc",
              // color: "#D04B4B",
                fontFamily: "italic",
                "&:hover":{
                  border: "none",
                  backgroundColor:"#E6756C"
                }
            }}
            startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

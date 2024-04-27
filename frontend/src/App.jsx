import './App.css'
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AddProduct from './admin/AddProduct';
import AllOrders from './admin/AllOrders';
import axios from "axios"
import {toast} from 'react-hot-toast'
import { useState,useEffect } from 'react';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
function App() {

  const [user, setUser] = useState("")

  const fetchUser = async() => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/user/me",{withCredentials:true})
      setUser(response?.data?.user)
    } catch (error) {
      console.log(error);
      toast.error('Please Login First')
    }
  }
console.log(user);

useEffect(() => {
fetchUser()
},[])

  return (
   <>
   <Router>
     
 <Navbar user={user}/>
     
     <Routes>
        <Route 
          path="/" 
      
          element={user ? <Home user= {user} setUser={setUser}/> : <Navigate to={"/login"} replace = "true"/>}
        />
  
  <Route 
       path="/register" 
       element={<Register setUser={setUser}/>} 

     />
     <Route 
          path="/login" 
          element={<Login setUser={setUser}/>}
         
        />
     <Route 
          path="/cart" 
          element={user ? <Cart user={user} setUser={setUser}/> : <Navigate to={"/login"} replace = "true"/>} 
        />
     <Route 
          path="/admin/add" 
          element={<AddProduct/>} 
        />
     <Route 
          path="/admin/allOrders" 
          element={true ? <AllOrders user={user} setUser={setUser}/> : <Navigate to={"/login"} replace = "true"/>} 
        />
     <Route 
          path="/myorders" 
          element={user ? <MyOrders user={user} setUser={setUser}/> : <Navigate to={"/login"} replace = "true"/>} 
        />

     </Routes>
      <Footer/>

   </Router>
   </>
  )
}

export default App

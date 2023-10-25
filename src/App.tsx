import React from 'react';

import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {NavbarComponent} from './components/Navbar';
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {Productpage} from "./components/ProductPage";
import { Cart } from './components/Cart';
import {Register} from './components/Register'
import { Profile } from './components/Profile';
import {Footer} from "./components/Footer";
import {VendorRegister} from "./components/VendorRegister";
import {Itempage} from "./components/Itempage";
import {Search} from "./components/Search";


function App() {
  return (
    <>
    <div className="d-flex flex-column align-items-between align-content-between">
    <Router>
      <div className="" >
        <div>
      <NavbarComponent/>
      </div>
      <main>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:idd" element={<Search/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/products" element={<Productpage/>}/>
      <Route path="/products/:id" element={<Itempage/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/vendorregistration" element={<VendorRegister/>}/>
     
     
      </Routes>
      </main>
      <div className=" justify-self-end" >
      <Footer/>
      </div>
      </div>
    </Router>
    
      
       
       
    </div>
   

    </>
  );
}

export default App;

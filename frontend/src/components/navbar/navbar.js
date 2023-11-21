import React, { useEffect, useState } from 'react';
import './navbar.css';
import logo from '../../assets/acebook_log_white.png'

const Navbar = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  
  const logout = () => {
    window.localStorage.removeItem("token")
  }

  
    if(token) {
      return (
        <div className="topnav">
          <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>
          <a href='/new_post' className='txt'>Create a Post</a>
          <a href='/countdown' className='txt'>Token Timer</a>
          <a href='/profile' className='txt'> Profile Page</a>
          <a href='/' className='txt right' onClick={logout}>Log-Out</a>
        </div>
      );
    } else {
      return (
        <div class="topnav">
          <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>
          <a href='/countdown' className='txt'>Token Timer</a>
          <a href='/login' className='txt right' >Log in</a>
        </div>
      )
    }}

export default Navbar;
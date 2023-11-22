import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/loggedin/LoggedInCheck';
import useTokenValidityCheck from '../components/loggedin/useTokenValidityCheck';

import Navbar from "../components/navbar/navbar";
import Feed from "../components/feed/Feed";
import NewPostForm from "../components/post_create/NewPostForm";
import LoginPopup from "../components/auth/LoginPopup";

const Index = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // const isLoggedIn = isTokenValid();
  // const [isLoggedIn, setIsLoggedIn] = useState(null); // State to hold login status

  // // Initial check on successful login -- prevents non-logged-in users from manually inputting this URL
  // useEffect(() => {
  //   const tokenIsValid = isTokenValid();
  //   setIsLoggedIn(tokenIsValid); // Set the login status in the component state

  //   // Redirect to login page if the token is not valid
  //   if (tokenIsValid === false) {
  //     navigate('/');
  //   }
  // }, [navigate]); // Include navigate in the dependency array to ensure the effect runs when navigate changes


  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ========== 
  const [showLoginPopup, setShowLoginPopup] = useState(!useTokenValidityCheck()); // Checks if token is timed out every 5 seconds. If so, nav bar changes & login popup

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    navigate('/');
  }

  // // ===== Check if the token exists, if not, redirect to the login page =========
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [navigate, token]);

  // Conditionally render content based on isLoggedIn state
  return (
    <div>
      {/* {isLoggedIn === true ? ( */}
      {token ? (
        <div>
          <Navbar/>
          <p>Welcome to AceBook</p>
          <NewPostForm navigate={navigate}/>
          <Feed/>

          {/* LOGIN POPUP -- COPY TO EVERY AUTHENTICATED PAGE */}
          {showLoginPopup && 
            <LoginPopup 
              navigate={navigate} 
              onClose={closeLoginPopup} 
            />
          }

        </div>
      ) 
      : (
        <div>This Code Will render when the Token is neither True or False - If you're seeing this on page this is a bug</div>
      )}
    </div>
  );
};


export default Index;
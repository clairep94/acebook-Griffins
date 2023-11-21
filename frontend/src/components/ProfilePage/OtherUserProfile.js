import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import defaultProfilePic from './profilePic/defaultProfilePic.png'
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const OtherUserProfile = ({navigate}) => {
  const { userId } = useParams();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(null); // State to hold user data
  const [name, setName] = useState(null)
  const [match, setMatch] = useState(null)
  // The Below is included from a failed experiment and remains only
  // on the offchance it may be useful to somebody - Feel free to delete


  useEffect(() => {
    if (token) {
    
      // This ensures the user's ID is fetched dynamically from the URL
      fetch(`/userData/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));

        // Set user data obtained from the API response to the state
        setUser(userData.user);
        setName(userData.user.email)
        
        const decodedToken = parseJwt(token);
        const uId = decodedToken ? decodedToken.user_id : null;
        console.log('the token id', uId)

        if(userData.user._id === uId){
          
          navigate('/profile');
        }
        if(userData.user.displayName){
          setName(userData.user.displayName)

        }
        
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., set an error state or display a message
      });
    }
  }, []); // Include token and userId in the dependency array

  return (
    <div>
      <Navbar/>
      <img className="profilepic" src={defaultProfilePic}></img>
      {user && (
          <>
            <div>
               {/* modified to dispaly the email as display name if there is no display name */}
              <h1>{name}'s ProfilePage</h1>
              <h3>{name}'s email {user.email}</h3>
              <h3>{name}'s  Bio:</h3>
              <span id="bio" className={styles.bio}>
                {user.bio}
              </span>
            </div>
          </>
        )}

    </div>
  );
};

export default OtherUserProfile;
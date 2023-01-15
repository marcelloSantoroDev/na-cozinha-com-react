import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import './css/Profile.css';

function ProfileComponent() {
  const [emailProfile, setEmailProfile] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmailProfile(userEmail.email);
    }
  }, [setEmailProfile]);
  return (
    <div>
      <h4 data-testid="profile-email" className="profile-email">{emailProfile}</h4>
      <div className="profile-btns-container">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            setEmailProfile('');
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileComponent;

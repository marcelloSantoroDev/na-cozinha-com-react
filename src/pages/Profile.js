import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileComponent from '../components/ProfileComponent';

function Profile() {
  return (
    <>
      <Header title="Profile" />
      <ProfileComponent />
      <Footer />
    </>
  );
}

export default Profile;

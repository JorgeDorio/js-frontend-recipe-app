import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import ProfileSpecs from '../components/ProfileSpecs';
import '../style/profile.css';

function Profile() {
  return (
    <>
      <HeaderNoSearch />
      <ProfileSpecs />
      <Footer />
    </>
  );
}

export default Profile;

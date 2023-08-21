import React from 'react';
import PostSide from '../components/PostSide/PostSide';
import ProfileSide from '../components/profileSide/ProfileSide';
import RightSide from '../components/RightSide/RightSide';
import './Home.css';
const Home = ({ users }) => {
  return (
    <div className="Home">
      <ProfileSide users={users} />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;

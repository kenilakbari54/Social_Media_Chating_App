import React from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css';
const ProfileSide = ({ users }) => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homepage" users={users} />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;

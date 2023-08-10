import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChat } from '../../actions/ChatAction';

const ChatUser = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    let data = {
      senderId: user._id,
      receiverId: person._id,
    };
    dispatch(createChat(data));
    // body: JSON.stringify(data);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            publicFolder + person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + 'defaultProfile.png'
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button" onClick={handleFollow}>
        Connect
      </button>
    </div>
  );
};

export default ChatUser;

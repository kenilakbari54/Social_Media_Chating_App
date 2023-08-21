import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,

    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;

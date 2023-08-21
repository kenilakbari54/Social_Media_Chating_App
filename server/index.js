import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./models/userModel.js";
import { OAuth2Client } from "google-auth-library";

// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'
import session from "express-session";
import passports from "passport";
import morgan from "morgan";
import helmet from 'helmet'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));










dotenv.config();
const PORT = process.env.PORT;

const CONNECTION = process.env.MONGO_URL;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)




const clientId =
  '816998418840-h8onf3qjb9dolporn5iref5aiqrmu1ju.apps.googleusercontent.com';
const authClient = new OAuth2Client(clientId)

app.post('/google', (req, res) => {
  console.log("hello")
  const { idToken } = req.body;
  if (idToken) {
    authClient.verifyIdToken({ idToken, audience: clientId })
      .then(response => {
        console.log(response)
        const { email_verified, email, name, picture } = response.payload
        if (email_verified) {
          UserModel.findOne({ email }).exec((err, user) => {
            if (user) {
              return res.json(user)
            }
            else {
              let password = email + clientId
              let username = name
              let profilePicture = picture
              let newUser = new UserModel({ username, profilePicture, password });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(200).json({ error: "mongodb error" })
                }
                res.json(data)
              })
              const token = jwt.sign(
                { username: newUser.username, id: newUser._id },
                process.env.key,
                { expiresIn: "1h" }
              );
              res.status(200).json({ user, token });
            }
          })

        }

      })
      .catch(err => { console.log(err) })
  }
})
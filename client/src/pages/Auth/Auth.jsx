import React, { useEffect, useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { logIn, signUp } from '../../actions/AuthActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import GitHubLogin from 'react-github-login';

const Auth = (props) => {
  const initialState = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  const clientId =
    '816998418840-h8onf3qjb9dolporn5iref5aiqrmu1ju.apps.googleusercontent.com';

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const responseGoogle = (response) => {
    // console.log(response);
    // console.log(response.profileObj.email);

    let data = {
      username: response.profileObj.name,
      firstname: response.profileObj.givenName,

      lastname: response.profileObj.familyName,
      password: response.profileObj.name,
      confirmpass: response.profileObj.name,
    };

    // axios
    //   .post('http://localhost:5000/google', { idToken: response.tokenId })
    //   .then(() => {
    // console.log(response)
    if (isSignUp) {
      dispatch(logIn(data, navigate));
    } else {
      dispatch(logIn(data, navigate));
    }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);
  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>KING'S Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          {/* <br />
          <GitHubLogin
            clientId="6bf27ea26ec0b5879e94"
            onSuccess={onSuccess}
            onFailure={onFailure}
          /> */}
          <hr style={{ width: '300px' }}></hr>
          <h5>Or with email and password</h5>

          <h3>{isSignUp ? 'Register' : 'Login'}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
              display: confirmPass ? 'none' : 'block',
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? 'Already have an account Login'
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-body">
      <video className="left-login" muted autoPlay loop>
        <source className="login-image" src="https://jmb-s3-bucket.s3.amazonaws.com/hockey-video.mp4" />
      </video>
      <div className="right-login">
        <form className="login-form" onSubmit={onSignUp}>
          <h3 className="login-title">Sign up for Chirp</h3>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
            <label className="login-label">Username</label>
          </div>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
            <label className="login-label">Email</label>
          </div>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
            <label className="login-label">Password</label>
          </div>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <label className="login-label">Repeat Password</label>
          </div>
          <button className="login-button" type="submit">Sign Up</button>
          <div className="login-signup-link-con">
            <p>
              Already have an account? <span onClick={() => history.push('/login')} className="login-signup-link">Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

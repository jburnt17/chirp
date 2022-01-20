import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-body">
      <video className="left-login" muted autoPlay loop>
        <source className="login-image" src="/hockey-video.mp4" />
      </video>
      <div className="right-login">
        <form className="login-form" onSubmit={onLogin}>
          <h3 className="login-title">Sign in to Chirp</h3>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
              required={true}
            />
            <label className="login-label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
              required={true}
            />
            <label className="login-label" htmlFor="password">
              Password
            </label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <div className="login-signup-link-con">
            <p>
              Don't have an account? <span onClick={() => history.push('/sign-up')} className="login-signup-link">Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

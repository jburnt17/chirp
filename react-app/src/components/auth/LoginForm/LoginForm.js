import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNot, setShowNot] = useState(false);
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

  useEffect(() => {
    setShowNot(true)
    setTimeout(() => {
      setShowNot(false)
    }, 4000)
  }, [errors])

  if (user) {
    return <Redirect to="/" />;
  }


  return (
    <div className="login-body">
      {showNot && errors.length ?(
        <div id="error" className="error">
          <p>Invalid email or password</p>
        </div>
      ) : null}
      <video className="left-login" muted autoPlay loop>
        <source
          className="login-image"
          src="https://jmb-s3-bucket.s3.amazonaws.com/hockey-video.mp4"
        />
      </video>
      <div className="right-login">
        <form className="login-form" onSubmit={onLogin}>
          <h3 className="login-title">Sign in to Chirp</h3>
          <div className="login-input-wrapper">
            <input
              className={!errors.length ? `login-input` : `login-input-error`}
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
              required={true}
            />
            <label
              className={!errors.length ? `login-label` : `login-label-error`}
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="login-input-wrapper">
            <input
              className={!errors.length ? `login-input` : `login-input-error`}
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
              required={true}
            />
            <label
              className={!errors.length ? `login-label` : `login-label-error`}
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <div className="login-signup-link-con">
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => history.push("/sign-up")}
                className="login-signup-link"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
        <div className="info-links">
          <p>Built by Jared Burnett:</p>
          <img src="https://raw.githubusercontent.com/jburnt17/chirp/f55114705554544ed133f8c938946b43da39c1fb/react-app/public/github-square-brands.svg" width={18} onClick={() => window.location.href = "https://github.com/jburnt17"}/>
          <img src="https://raw.githubusercontent.com/jburnt17/chirp/f55114705554544ed133f8c938946b43da39c1fb/react-app/public/linkedin-brands.svg" width={18} onClick={() => window.location.href = "https://www.linkedin.com/in/jared-burnett-36a327225/"}/>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

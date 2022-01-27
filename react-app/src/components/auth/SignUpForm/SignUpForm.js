import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const errors = [];
    if (password !== repeatPassword) errors.push("Passwords do not match.");
    setErrors([...errors]);
  }, [repeatPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!errors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors([...errors, data]);
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

  useEffect(() => {
    console.log(errors);
    console.log(errors[0]?.includes("username : Username is already in use."));
    console.log(
      errors[0]?.includes("email : Email address is already in use.")
    );
  }, [errors]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-body">
      {/* <div>
        {errors.length
          ? errors.map((error, ind) => <div key={ind}>{error}</div>)
          : null}
      </div> */}
      <video className="left-login" muted autoPlay loop>
        <source
          className="login-image"
          src="https://jmb-s3-bucket.s3.amazonaws.com/hockey-video.mp4"
        />
      </video>
      <div className="right-login">
        <form className="login-form" onSubmit={onSignUp}>
          <h3 className="login-title">Sign up for Chirp</h3>
          <div className="login-input-wrapper">
            <input
              className={
                !errors[0]?.includes("username : Username is already in use.")
                  ? `login-input`
                  : `login-input-error`
              }
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
            <label
              className={
                !errors[0]?.includes("username : Username is already in use.")
                  ? `login-label`
                  : `login-label-error`
              }
            >
              Username
            </label>
            {errors[0]?.includes("username : Username is already in use.") && <div className="error-label">Username is already in use.</div>}
          </div>
          <div className="login-input-wrapper">
            <input
              className={
                !errors[0]?.includes("email : Email address is already in use.")
                  ? `login-input`
                  : `login-input-error`
              }
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
            <label
              className={
                !errors[0]?.includes("email : Email address is already in use.")
                  ? `login-label`
                  : `login-label-error`
              }
            >
              Email
            </label>
            {errors[0]?.includes("email : Email address is already in use.") && <div className="error-label">Email is already in use.</div>}
          </div>
          <div className="login-input-wrapper">
            <input
              className={
                !errors.includes("Passwords do not match.")
                  ? `login-input`
                  : `login-input-error`
              }
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
            <label
              className={
                !errors.includes("Passwords do not match.")
                  ? `login-label`
                  : `login-label-error`
              }
            >
              Password
            </label>
          </div>
          <div className="login-input-wrapper">
            <input
              className={
                !errors.includes("Passwords do not match.")
                  ? `login-input`
                  : `login-input-error`
              }
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <label
              className={
                !errors.includes("Passwords do not match.")
                  ? `login-label`
                  : `login-label-error`
              }
            >
              Repeat Password
            </label>
            {errors[0]?.includes("Passwords do not match.") && <div className="error-label">Passwords do not match.</div>}
          </div>
          <button className="login-button" type="submit">
            Sign Up
          </button>
          <div className="login-signup-link-con">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => history.push("/login")}
                className="login-signup-link"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

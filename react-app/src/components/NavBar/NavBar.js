import { UserIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar-list">
        <li>
          <HomeIcon className="nav-icon" />
          <NavLink
            className="home-text"
            to="/"
            exact={true}
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <img
            className="nav-icon"
            src="https://raw.githubusercontent.com/jburnt17/chirp/3305c39195afaf760ea81d434ccfc9e92be32c34/react-app/public/hockey-sticks.svg"
          />
          <div className="nav-scores-link">Scores</div>
        </li>
        <li>
          <img className="nav-icon" src="medal.svg"/>
          <div className="nav-scores-link">Stats</div>
        </li>
        <li>
          <img className="nav-icon" src="trophy2.svg"/>
          <div className="nav-scores-link">Standings</div>
        </li>
        <li>
          <UserIcon className="nav-icon" />
          <NavLink
            className="users"
            to="/users"
            exact={true}
            activeClassName="active"
          >
            Users
          </NavLink>
        </li>
        <button className="nav-lobby-button">Create Lobby</button>
      </ul>
      <div
        className="user-profile-container"
        onClick={() => setShowUserOptions(!showUserOptions)}
      >
        <img
          className="nav-avatar"
          src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg"
        />
        <div>
          <p className="nav-username">{user.username}</p>
          <p className="nav-email">{user.email}</p>
        </div>

        {showUserOptions && (
          <div className="nav-user-options">
            <div className="user-profile-options">
              <img
                className="nav-options-avatar"
                src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg"
              />
              <div>
                <p className="nav-username">{user.username}</p>
                <p className="nav-email">{user.email}</p>
              </div>
            </div>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            <div className="triangle"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

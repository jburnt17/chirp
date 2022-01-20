import { UserIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar-list">
        <li>
          <HomeIcon className="nav-icon" />
          <NavLink className="home-text" to="/" exact={true} activeClassName="active">
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
        {/* <LogoutButton/> */}
        <div className="user-profile-container">
          
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;

import { HomeIcon, UserIcon } from "@heroicons/react/outline";
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar-list">
        <li>
          <HomeIcon />
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <div>
            Scores
          </div>
        </li>
        <li>
          <UserIcon />
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <button>Create Lobby</button>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

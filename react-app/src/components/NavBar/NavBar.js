import { HomeIcon, XIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import CreateLobbyModal from "../CreateLobbyModal/CreateLobbyModal";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modal = document.querySelector(".nav-lobby-modal");
  useEffect(() => {
    modal?.addEventListener("click", () => {
      console.log("hello")
    })
  }, [modal])

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <nav className="nav-bar-container">
      {showModal && (
        <div className="nav-lobby-modal">
          <CreateLobbyModal />
          <XIcon className="x-icon-modal" onClick={() => setShowModal(false)} />
        </div>
      )}
      <ul className="nav-bar-list">
        <li onClick={() => history.push("/")}>
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
        <li onClick={() => history.push("/scores")}>
          <img
            className="nav-icon"
            src="https://raw.githubusercontent.com/jburnt17/chirp/3305c39195afaf760ea81d434ccfc9e92be32c34/react-app/public/hockey-sticks.svg"
          />
          <div className="nav-scores-link">Scores</div>
        </li>
        <li onClick={() => history.push("/rosters")}>
          <img
            className="nav-icon"
            src="https://raw.githubusercontent.com/jburnt17/chirp/58e4af7c87d4fab131fbea0adfbc59caa7574aff/react-app/public/medal.svg"
          />
          <div className="nav-scores-link">Rosters</div>
        </li>
        <li onClick={() => history.push("/standings")}>
          <img
            className="nav-icon"
            src="https://raw.githubusercontent.com/jburnt17/chirp/58e4af7c87d4fab131fbea0adfbc59caa7574aff/react-app/public/trophy2.svg"
          />
          <div className="nav-scores-link">Standings</div>
        </li>
        <button className="nav-lobby-button" onClick={() => setShowModal(true)}>
          Create Lobby
        </button>
      </ul>
      <div
        className="user-profile-container"
        onClick={() => setShowUserOptions(!showUserOptions)}
      >
        <img
          className="nav-avatar"
          src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg"
        />
        <div className="nav-user-info">
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
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
            <div className="triangle"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

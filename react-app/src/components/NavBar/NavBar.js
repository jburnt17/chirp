import { HomeIcon, XIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import CreateLobbyModal from "../CreateLobbyModal/CreateLobbyModal";
import "./NavBar.css";

const NavBar = ({isDarkMode}) => {
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
      <ul className={isDarkMode ? "nav-bar-list-dark" : "nav-bar-list"}>
        <li onClick={() => history.push("/")}>
          <HomeIcon className={isDarkMode ? "nav-icon-dark" : "nav-icon"} id={isDarkMode && "home-dark-mode"}/>
          <div className={isDarkMode ? "home-text-dark" : "home-text"}>Home</div>
        </li>
        <li onClick={() => history.push("/scores")}>
          <img
            className={isDarkMode ? "nav-icon-dark" : "nav-icon"}
            src="https://raw.githubusercontent.com/jburnt17/chirp/3305c39195afaf760ea81d434ccfc9e92be32c34/react-app/public/hockey-sticks.svg"
          />
          <div className="nav-scores-link">Scores</div>
        </li>
        <li onClick={() => history.push("/rosters")}>
          <img
            className={isDarkMode ? "nav-icon-dark" : "nav-icon"}
            src="https://raw.githubusercontent.com/jburnt17/chirp/58e4af7c87d4fab131fbea0adfbc59caa7574aff/react-app/public/medal.svg"
          />
          <div className="nav-scores-link">Rosters</div>
        </li>
        <li onClick={() => history.push("/standings")}>
          <img
            className={isDarkMode ? "nav-icon-dark" : "nav-icon"}
            src="https://raw.githubusercontent.com/jburnt17/chirp/58e4af7c87d4fab131fbea0adfbc59caa7574aff/react-app/public/trophy2.svg"
          />
          <div className="nav-scores-link">Standings</div>
        </li>
        <button className={isDarkMode ? "nav-lobby-button-dark" : "nav-lobby-button"} onClick={() => setShowModal(true)}>
          Create Lobby
        </button>
      </ul>
      <div
        className="user-profile-container"
        onClick={() => setShowUserOptions(!showUserOptions)}
      >
        <img
          className={isDarkMode ? "nav-avatar-dark" : "nav-avatar"}
          src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg"
        />
        <div className="nav-user-info">
          <p className={isDarkMode ? "nav-username-dark" : "nav-username"}>{user.username}</p>
          <p className={isDarkMode ? "nav-email-dark" : "nav-email"}>{user.email}</p>
        </div>

        {showUserOptions && (
          <div className="nav-user-options">
            <div className="user-profile-options">
              <img
                className="nav-options-avatar"
                src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg"
              />
              <div>
                <p className={isDarkMode ? "nav-username-dark" : "nav-username"}>{user.username}</p>
                <p className={isDarkMode ? "nav-email-dark" : "nav-email"}>{user.email}</p>
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

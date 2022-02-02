import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGames } from "../../store/games";
import { darkMode, getDarkMode } from "../../store/session";
import { getTodaysGames } from "../../store/todaysGames";
import CreateGameLobby from "../CreateGameLobbyForm/CreateGameLobby";
import GameLobby from "../GameLobby/GameLobby";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./HomePage.css";

function HomePage({ users }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const isDarkMode = useSelector((state) => state.session.darkMode);

  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbies = Object.values(gameLobbiesObj);

  useEffect(() => {
    (function () {
      document.documentElement.scrollTop = 0;
    })();
    dispatch(getDarkMode())
    dispatch(getTodaysGames());
  }, []);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, [dispatch]);

  return (
    <div>
      <button onClick={isDarkMode ? () => dispatch(darkMode(false)) : () => dispatch(darkMode(true))}>DARK MODE</button>
      <div className={isDarkMode ? `home-page-body-dark` : `home-page-body`}>
        <div className={isDarkMode ? "home-page-left-dark" : "home-page-left"}>
          <NavBar isDarkMode={isDarkMode}/>
        </div>
        <div className="home-page-middle">
          <div className={isDarkMode ? "middle-nav-dark" : "middle-nav"}>
            <div onClick={() => (document.documentElement.scrollTop = 0)}>
              Home
            </div>
          </div>
          <CreateGameLobby gamesToday={gamesToday} isDarkMode={isDarkMode}/>
          <GameLobby
            className={isDarkMode ? "game-lobby-dark" : "game-lobby"}
            gameLobbies={gameLobbies}
            gamesToday={gamesToday}
            sessionUser={sessionUser}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className={isDarkMode ? "home-page-right-dark" : "home-page-right"}>
          <TodaysGames gamesToday={gamesToday} isDarkMode={isDarkMode}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

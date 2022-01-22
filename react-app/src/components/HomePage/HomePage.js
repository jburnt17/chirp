import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGames } from "../../store/games";
import { getTodaysGames } from "../../store/todaysGames";
import CreateGameLobby from "../CreateGameLobbyForm/CreateGameLobby";
import GameLobby from "../GameLobby/GameLobby";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbies = Object.values(gameLobbiesObj);

  useEffect(() => [dispatch(getTodaysGames())], []);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, [dispatch]);

  return (
    <div>
      <div className="home-page-body">
        <div className="home-page-left">
          <NavBar />
        </div>
        <div className="home-page-middle">
          <div className="middle-nav">
            <div onClick={() => (document.documentElement.scrollTop = 0)}>
              Home
            </div>
          </div>
          <CreateGameLobby gamesToday={gamesToday} />
          <GameLobby
            className="game-lobby"
            gameLobbies={gameLobbies}
            gamesToday={gamesToday}
            sessionUser={sessionUser}
          />
        </div>
        <div className="home-page-right">
          <TodaysGames gamesToday={gamesToday} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

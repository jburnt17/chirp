import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGames } from "../../store/games";
import { getTodaysGames } from "../../store/teams";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./GameLobbyPage.css";

function GameLobbyPage() {
  const dispatch = useDispatch();
  const {gameNumber} = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbies = Object.values(gameLobbiesObj);
  const game = gamesToday[gameNumber]
  console.log(game)

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, []);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, [dispatch]);

  const teams = game?.teams
  let home, away
  teams && (home = teams.home)
  teams && (away = teams.away)
  console.log('home', home)
  console.log('away', away)


  return (
    <div className="game-lobby-page-body">
      <div className="game-lobby-left">
        <NavBar />
      </div>
      <div className="game-lobby-middle">
        {home && Object.values(home).map((homeTeamInfo) => (
          <div>{homeTeamInfo.name}</div>
        ))}
        <div>{home && home.score}</div>
        {away && Object.values(away).map((awayTeamInfo) => (
          <div>{awayTeamInfo.name}</div>
        ))}
        <div>{away && away.score}</div>
      </div>
      <div className="game-lobby-right">
        <TodaysGames gamesToday={gamesToday} />
      </div>
    </div>
  );
}

export default GameLobbyPage;

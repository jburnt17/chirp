import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGames } from "../../store/games";
import { createChirp, loadChirps } from "../../store/chirps";
import { getTodaysGames } from "../../store/teams";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./GameLobbyPage.css";

function GameLobbyPage() {
  const dispatch = useDispatch();
  const { gameNumber, gameId } = useParams();
  const [content, setContent] = useState("");

  const sessionUser = useSelector((state) => state.session.user);
  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbyChirpsObj = useSelector((state) => state.chirps);

  const gamesToday = Object.values(gamesTodayObj);
  const gameLobbies = Object.values(gameLobbiesObj);
  const unfilteredChirps = Object.values(gameLobbyChirpsObj);
  console.log('chirps', unfilteredChirps)
  const gameLobbyChirps = unfilteredChirps.filter((chirp) => +chirp.game_id === +gameId);
  console.log(gameLobbyChirps)

  const game = gamesToday[gameNumber];
  const teams = game?.teams;
  let home, away;
  teams && (home = teams.home);
  teams && (away = teams.away);

  const handleChirpSubmit = (e) => {
    e.preventDefault();
    dispatch(createChirp(gameId, content));
  };

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
    dispatch(loadChirps(gameId));
  }, []);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(content)
  // }, [content])

  return (
    <div className="game-lobby-page-body">
      <div className="game-lobby-left">
        <NavBar />
      </div>
      <div className="game-lobby-middle">
        {home &&
          Object.values(home).map((homeTeamInfo) => (
            <div>{homeTeamInfo.name}</div>
          ))}
        <div>{home && home.score}</div>
        {away &&
          Object.values(away).map((awayTeamInfo) => (
            <div>{awayTeamInfo.name}</div>
          ))}
        <div>{away && away.score}</div>
        <form onSubmit={(e) => handleChirpSubmit(e)}>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            type="text"
            value={content}
          />
          <button>Chirp</button>
        </form>
        {gameLobbyChirps.map((chirp) => (
          <div>
            <div>{chirp.content}</div>
          </div>
        ))}
      </div>
      <div className="game-lobby-right">
        <TodaysGames gamesToday={gamesToday} />
      </div>
    </div>
  );
}

export default GameLobbyPage;

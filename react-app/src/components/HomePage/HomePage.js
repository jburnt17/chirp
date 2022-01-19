import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGame, getGames } from "../../store/games";
import { getTodaysGames } from "../../store/teams";
import GameLobby from "../GameLobby/GameLobby";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbies = Object.values(gameLobbiesObj);

  const [gameOption, setGameOption] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(gameOption));
  };

  useEffect(() => [dispatch(getTodaysGames())], []);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, [dispatch]);

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => setGameOption(e.target.value)}
        >
          <select>
            {gamesToday.map((gameToday, i) => (
              <option value={i}>
                {gameToday.teams.away.team.name} vs{" "}
                {gameToday.teams.home.team.name}
              </option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
      <TodaysGames gamesToday={gamesToday} />
      <GameLobby
        gameLobbies={gameLobbies}
        gamesToday={gamesToday}
        sessionUser={sessionUser}
      />
    </div>
  );
}

export default HomePage;

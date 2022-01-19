import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGame, getGames } from "../../store/games";
import { getTodaysGames } from "../../store/teams";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();

  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbies = Object.values(gameLobbiesObj);

  const [gameOption, setGameOption] = useState(0);

  console.log("Games Today ====>", gamesToday);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Game Option =>", gameOption);
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
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => setGameOption(e.target.value)}>
          <select >
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
      {gamesToday.map((gameToday) => (
        <div className="schedule-container">
          <div className="single-game">
            <div className="game-date">
              {new Date(gameToday.gameDate).toLocaleString().split(",")[1]}
            </div>
            <span>
              <img
                width={144}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.away.team.id}.svg
`}
              />
            </span>
            {gameToday.teams.away.team.name} vs {gameToday.teams.home.team.name}
            <span>
              <img
                width={144}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.home.team.id}.svg
`}
              />
            </span>
          </div>
        </div>
      ))}
      {gameLobbies.map((gameLobby) => (
        <div>
          <div className="schedule-container">
          <div className="single-game">
            <div className="game-date">
              {new Date(gamesTodayObj[gameLobby.game_number]?.gameDate).toLocaleString().split(",")[1]}
            </div>
            <span>
              <img
                width={144}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gamesToday[gameLobby.game_number]?.teams.away.team.id}.svg
`}
              />
            </span>
            {gamesToday[gameLobby.game_number]?.teams.away.team.name} vs {gamesToday[gameLobby.game_number]?.teams.home.team.name}
            <span>
              <img
                width={144}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gamesToday[gameLobby.game_number]?.teams.home.team.id}.svg
`}
              />
            </span>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

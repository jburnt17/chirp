import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGame } from "../../store/games";
import { getTeams } from "../../store/teams";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const teamsObj = useSelector((state) => state.gamesToday);
  const teams = Object.values(teamsObj);
  const [gameOption, setGameOption] = useState(0);

  console.log(teams);

  useEffect(() => {
    dispatch(getTeams());
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gameOption)
    dispatch(createGame(gameOption))
  }

  return (
    <div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => setGameOption(e.target.value)}>
          <select>
            {teams.map((team, i) => (
              <>
                <option value={i}>
                  {team.teams.away.team.name} vs {team.teams.home.team.name}
                </option>
              </>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
      {teams.map((team) => (
        <div className="schedule-container">
          <div className="single-game">
            <div className="game-date">
              {new Date(team.gameDate).toLocaleString().split(",")[1]}
            </div>
            <span>
              <img
                width={144}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${team.teams.away.team.id}.svg
`}
              />
            </span>
            {team.teams.away.team.name} vs {team.teams.home.team.name}
            <span>
              <img
                width={144}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${team.teams.home.team.id}.svg
`}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

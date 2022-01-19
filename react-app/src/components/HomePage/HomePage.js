import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeams } from "../../store/teams";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const teamsObj = useSelector((state) => state.games);
  const teams = Object.values(teamsObj);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  return (
    <div>
      {teams.map((team) => (
        <div className="schedule-container">
          <div className="single-game">
            <div className="game-date">
              {new Date(team.gameDate).toLocaleString().split(',')[1]}
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
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

import React from "react";
import { useSelector } from "react-redux";
import "./TodaysGames.css";

function TodaysGames() {
  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);
  return (
    <>
      <div className="todays-games-container">
    <p>Todays Games</p>
        {gamesToday.map((gameToday) => (
          <div>
            <div className="single-game">
              <span className="todays-game-teams">
                {gameToday.teams.away.team.name !== "Seattle Kraken" ? (
                  <img
                    width={48}
                    src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.away.team.id}.svg
`}
                  />
                ) : (
                  <img
                    width={28}
                    src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.away.team.id}.svg
`}
                  />
                )}
              </span>
              <div>
                {new Date(gameToday.gameDate)
                  .toLocaleString()
                  .split(",")[1]
                  .split(" ")[1]
                  .split(":")
                  .slice(0, 2)
                  .join(":") + " PM EST"}
              </div>
              <span className="todays-game-teams">
                {gameToday.teams.home.team.name !== "Seattle Kraken" ? (
                  <img
                    width={48}
                    src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.home.team.id}.svg
`}
                  />
                ) : (
                  <img
                    width={28}
                    src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.home.team.id}.svg
`}
                  />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodaysGames;

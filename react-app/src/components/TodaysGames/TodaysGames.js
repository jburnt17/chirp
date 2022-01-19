import React from "react";


function TodaysGames({gamesToday}) {

  return (
    <div>
      {gamesToday.map((gameToday) => (
        <div className="schedule-container">
          <div className="single-game">
            {/* <div className="game-date">
              {new Date(gameToday.gameDate).toLocaleString().split(",")[1]}
            </div> */}
            <span>
              <img
                width={64}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.away.team.id}.svg
`}
              />
            </span>
            {gameToday.teams.away.team.name} vs {gameToday.teams.home.team.name}
            <span>
              <img
                width={64}
                src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${gameToday.teams.home.team.id}.svg
`}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodaysGames;

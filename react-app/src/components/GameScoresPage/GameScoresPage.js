import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodaysGames } from "../../store/todaysGames";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./GameScoresPage.css";

function GameScoresPage() {
  const dispatch = useDispatch();
  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  useEffect(() => {
    dispatch(getTodaysGames());
  }, []);

  return (
    <div className="game-scores-page">
      <div className="game-lobby-left">
        <NavBar />
      </div>
      <div className="game-scores-middle">
        <div className="middle-nav">
          <div onClick={() => (document.documentElement.scrollTop = 0)}>
            Scores
          </div>
        </div>
        {gamesToday.map(({ teams }) => (
          <div>
            <div className="game-lobby-teams">
              <div className="game-lobby-team-info">
                <div className="game-lobby-team-stats">
                  {teams.home && teams.home.team.name !== "Seattle Kraken" ? (
                    <img
                      width={128}
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${teams.home?.team.id}.svg
`}
                    />
                  ) : (
                    <img
                      width={28}
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${teams.home?.team.id}.svg
`}
                    />
                  )}
                  <div>{teams.home && teams.home.team.name}</div>
                  <div>
                    {teams.home &&
                      `${teams.home.leagueRecord.wins} - ${teams.home.leagueRecord.losses} - ${teams.home.leagueRecord.ot}`}
                  </div>
                </div>
                <div className="game-lobby-score">
                  {teams.home && teams.home.score}
                </div>
              </div>

              <div className="game-lobby-team-info">
                <div className="game-lobby-score">
                  {teams.away && teams.away.score}
                </div>
                <div className="game-lobby-team-stats">
                  {teams.away && teams.away.team.name !== "Seattle Kraken" ? (
                    <img
                      width={128}
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${teams.away?.team.id}.svg
`}
                    />
                  ) : (
                    <img
                      width={28}
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${teams.away?.team.id}.svg
`}
                    />
                  )}
                  <div>{teams.away && teams.away.team.name}</div>
                  <div>
                    {teams.away &&
                      `${teams.away.leagueRecord.wins} - ${teams.away.leagueRecord.losses} - ${teams.away.leagueRecord.ot}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="game-lobby-right">
        <TodaysGames gamesToday={gamesToday} />
      </div>
    </div>
  );
}

export default GameScoresPage;

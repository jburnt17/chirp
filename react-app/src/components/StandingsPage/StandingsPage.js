import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStandings } from "../../store/standings";
import { getTodaysGames } from "../../store/todaysGames";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./StandingsPage.css";

function StandingsPage() {
  const dispatch = useDispatch();
  const standingsObj = useSelector((state) => state.standings);
  const standings = Object.values(standingsObj);
  console.log(standings);

  useEffect(() => {
    (function () {
      document.documentElement.scrollTop = 0;
    })();
    dispatch(getStandings());
    dispatch(getTodaysGames());
  }, []);

  return (
    <div className="standings-page-body">
      <div className="roster-left">
        <NavBar />
      </div>
      <div className="standings-page-middle">
        <div className="middle-nav">
          <div onClick={() => (document.documentElement.scrollTop = 0)}>
            Standings
          </div>
        </div>
        <div className="standings">
          {standings.map((standing, i) => (
            <>
              <h2>{standing.division.name}</h2>
              <div className="standings-table">
                <ul className="standings-row-names">
                  <li className="team-label">Team</li>
                  <div className="right-team-labels">
                    <li>GP</li>
                    <li>W</li>
                    <li>L</li>
                    <li>OTL</li>
                    <li>Pts</li>
                    <li>GF</li>
                    <li>GA</li>
                    <li>Strk</li>
                  </div>
                </ul>

                {standings[i].teamRecords.map((teams) => (
                  <div>
                    <ul className="standings-columns">
                      <div className="team-column">
                        {teams.team.name !== "Seattle Kraken" ? (
                          <img
                            width={64}
                            src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${teams.team.id}.svg
`}
                          />
                        ) : (
                          <img
                            width={32}
                            className="seattle"
                            src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${teams.team.id}.svg
`}
                          />
                        )}
                        <p>{teams.team.name}</p>
                      </div>
                      <div className="right-team-columns">
                        <li>{teams.gamesPlayed}</li>
                        <li>{teams.leagueRecord.wins}</li>
                        <li>{teams.leagueRecord.losses}</li>
                        <li>{teams.leagueRecord.ot}</li>
                        <li>{teams.points}</li>
                        <li>{teams.goalsScored}</li>
                        <li>{teams.goalsAgainst}</li>
                        <li>{teams.streak.streakCode}</li>
                      </div>
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="roster-lobby-right">
        <TodaysGames />
      </div>
    </div>
  );
}
export default StandingsPage;

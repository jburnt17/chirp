import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../store/teams";
import { getTodaysGames } from "../../store/todaysGames";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./RosterPage.css";

function RosterPage() {
  const dispatch = useDispatch();
  const teamsObj = useSelector((state) => state.teams);
  const teams = Object.values(teamsObj);

  const [showRoster, setShowRoster] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [stats, setStats] = useState();

  const playerStats = async (playerId) => {
    const response = await fetch(
      `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=20212022`
    );
    let info = await response.json();
    info = info?.stats[0]?.splits[0]?.stat;
    setStats(info);
  };

  const handleImageClick = (playerId) => {
    if (!showPlayer) {
      playerStats(playerId);
      setShowPlayer(playerId);
    } else {
      setShowPlayer(false);
    }
  };

  useEffect(() => {
    (function () {
      document.documentElement.scrollTop = 0;
    })();
    dispatch(getTeams());
    dispatch(getTodaysGames());
  }, []);

  return (
    <div className="roster-page-body">
      <div className="roster-left">
        <NavBar />
      </div>
      <div className="roster-middle">
        <div className="middle-nav">
          <div onClick={() => (document.documentElement.scrollTop = 0)}>
            Rosters
          </div>
        </div>
        {!teams.length ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="fa-spin fa-2x spinner-icon"
          />
        ) : (
          teams.map((team) => (
            <div className="team-roster-container">
              <div
                className="team-header-container"
                onClick={() =>
                  !showRoster
                    ? setShowRoster(team.link.split("/")[4])
                    : setShowRoster(false)
                }
              >
                <img
                  className="team-roster-logo"
                  width={64}
                  src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${
                    team.link.split("/")[4]
                  }.svg`}
                />
                <p>
                  {teams.find((team) => team.id === team.link.split("/")[4])}
                </p>
              </div>
              {showRoster == team.link.split("/")[4] &&
                team.roster.map((player) => (
                  <div
                    className="player-container"
                    onClick={() => handleImageClick(player.person.id)}
                  >
                    <div className="stats-player-info">
                      <img
                        className="player-image"
                        width={48}
                        src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
                      />
                      <p>
                        {player.person.fullName},{" "}
                        <span>{player.position.abbreviation}</span>
                      </p>
                    </div>
                    {showPlayer === player.person.id &&
                    player.position.abbreviation === "G" ? (
                      <div className="player-stats">
                        <div>Wins: {stats?.wins || "0"}</div>
                        <div>Losses: {stats?.losses || "0"}</div>
                        <div>
                          Save Percentage: {stats?.savePercentage || "0"}
                        </div>
                      </div>
                    ) : (
                      showPlayer === player.person.id && (
                        <div className="player-stats">
                          <div>Goals: {stats?.goals || "0"}</div>
                          <div>Assists: {stats?.assists || "0"}</div>
                          <div>Points: {stats?.points || "0"}</div>
                        </div>
                      )
                    )}
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
      <div className="roster-lobby-right">
        <TodaysGames />
      </div>
    </div>
  );
}

export default RosterPage;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import "./GameLobby.css";
import { removeGame } from "../../store/games";
import { useHistory } from "react-router-dom";

function GameLobby({ gameLobbies, gamesToday, sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = (e) => {
    const lobbyId = e.target.className.split("-")[1];
    console.log(lobbyId);
    dispatch(removeGame(lobbyId));
  };

  return (
    <div>
      {gameLobbies.map((gameLobby, i) => (
        <div className="game-lobby">
          <div className="game-lobby-user-info">
            <img src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg" />
            <p>User</p>
          </div>
          <div
            className="schedule-container"
            onClick={(e) => {
              (e.target.className === "game-lobby-con" ||
                e.target.className === "lobby-info") &&
                history.push(`/games/${gameLobby.game_number}/${gameLobby.id}`);
            }}
          >
            <div className="game-lobby-con">
              <div className="lobby-info">
                <span>
                  {gamesToday[gameLobby.game_number]?.teams.away.team.name !==
                  "Seattle Kraken" ? (
                    <img
                      width={96}
                      className="image-right"
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${
                        gamesToday[gameLobby.game_number]?.teams.away.team.id
                      }.svg
`}
                    />
                  ) : (
                    <img
                      width={58}
                      className="image-right"
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${
                        gamesToday[gameLobby.game_number]?.teams.away.team.id
                      }.svg
`}
                    />
                  )}
                </span>
                {gamesToday[gameLobby.game_number]?.teams.away.team.name} vs{" "}
                {gamesToday[gameLobby.game_number]?.teams.home.team.name}
                <span>
                  {gamesToday[gameLobby.game_number]?.teams.home.team.name !==
                  "Seattle Kraken" ? (
                    <img
                      width={96}
                      className="image-right"
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${
                        gamesToday[gameLobby.game_number]?.teams.home.team.id
                      }.svg
`}
                    />
                  ) : (
                    <img
                      width={58}
                      className="image-right"
                      src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${
                        gamesToday[gameLobby.game_number]?.teams.home.team.id
                      }.svg
`}
                    />
                  )}
                </span>
              </div>
              {/* TODO!!! FIX BUTTON ONCLICK SHOWING ALL DELETE BUTTONS */}
              {showOptions && (
                <div>
                  <button
                    className={`button-${gameLobby.id}`}
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </button>
                </div>
              )}
              {sessionUser.id === gameLobby.user_id && (
                <DotsHorizontalIcon
                  width={24}
                  cursor={"pointer"}
                  className={`lobby-option-icon-${i}`}
                  id="lobby-options"
                  onClick={() => setShowOptions(!showOptions)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameLobby;

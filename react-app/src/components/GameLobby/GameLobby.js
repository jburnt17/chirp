import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import "./GameLobby.css";
import { removeGame } from "../../store/games";
import { useHistory } from "react-router-dom";
import date from "date-and-time";
import moment from 'moment';

function GameLobby({ gameLobbies, gamesToday }) {
  const [users, setUsers] = useState([]);


  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showOptions, setShowOptions] = useState("");

  const handleDelete = (e) => {
    const lobbyId = e.target.className.split("-")[1];
    dispatch(removeGame(lobbyId));
  };


  const handleTime = (postDate) => {
    // const date1 = new Date(postDate)
    const date1 = moment.utc(postDate).local()._d
    const date2 = moment.utc().local()._d
    const difference = new Date(date.subtract(date2, date1).toMilliseconds())
    const hour = (moment.utc(difference).local()._d).getHours()
    if (hour === 0) {
      const diffMinutes = new Date(date.subtract(date2, date1).toMilliseconds())
      const minutes = (moment.utc(diffMinutes).local()._d).getMinutes()
      return minutes + "m";
    }
    return hour + "h";
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  return (
    <div>
      {gameLobbies.map((gameLobby, i) => (
        <div className="game-lobby">
          {/* <p>{new Date(gameLobby.date).getTime()}</p> */}
          <div className="game-lobby-user-info">
            <img src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg" />
            <p>
              {users &&
                users.find((user) => user.id === gameLobby.user_id)?.username}
            </p>
            <div className="user-post-time">• {handleTime(gameLobby.date)}</div>
            <p>lobby creation = {gameLobby.date}</p>
            <p>now = {new Date().toString()}</p>
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
              {showOptions == gameLobby.id && (
                <div className="home-page-options-cont">
                  <div className="home-option-buttons">
                    <button
                      className={`button-${gameLobby.id}`}
                      onClick={(e) => handleDelete(e)}
                      id="delete-button"
                    >
                      Delete
                    </button>
                    <button
                      id="cancel-button"
                      onClick={() => setShowOptions(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {sessionUser.id === gameLobby.user_id && (
                <>
                  <DotsHorizontalIcon
                    width={28}
                    cursor={"pointer"}
                    className="lobby-options"
                  />
                  <div
                    className="options-wrapper"
                    id={`option-${gameLobby.id}`}
                    onClick={(e) => {
                      setShowOptions(e.target.id?.split("-")[1]);
                    }}
                  ></div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameLobby;

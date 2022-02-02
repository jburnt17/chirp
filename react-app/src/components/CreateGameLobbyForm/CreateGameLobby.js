import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGame } from "../../store/games";
import "./CreateGameLobby.css";

function CreateGameLobby({ gamesToday, isDarkMode }) {
  const [gameOption, setGameOption] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(gameOption));
    history.push("/");
  };

  return (
    <div className={isDarkMode ? "game-lobby-form-con-dark" : "game-lobby-form-con"}>
      <div className="game-lobby-form-header">
        <img className={isDarkMode ? "game-lobby-ava-dark" : "game-lobby-ava"} src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg" />
        <p className={isDarkMode ? "game-lobby-title-dark" : "game-lobby-title"}>Start hosting your lobby</p>
      </div>

      <form
        className="game-lobby-form"
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => setGameOption(e.target.value)}
      >
        <div className="select-wrapper">
          <select className={isDarkMode ? "select-menu-dark" : "select-menu"}>
            {gamesToday.map((gameToday, i) => (
              <option value={i}>
                {gameToday.teams.away.team.name} vs{" "}
                {gameToday.teams.home.team.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="select-arrow" />
        </div>
        <button className={isDarkMode ? "game-lobby-form-button-dark" : "game-lobby-form-button"}>Submit</button>
      </form>
    </div>
  );
}

export default CreateGameLobby;

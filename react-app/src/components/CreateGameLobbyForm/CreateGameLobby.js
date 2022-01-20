import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../../store/games";
import "./CreateGameLobby.css";

function CreateGameLobby({ gamesToday }) {
  const [gameOption, setGameOption] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(gameOption));
  };

  return (
    <div className="game-lobby-form-con">
      <div className="game-lobby-form-header">
        <img src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg" />
        <p>Start hosting your lobby</p>
      </div>

      <form
        className="game-lobby-form"
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => setGameOption(e.target.value)}
      >
        <div className="select-wrapper">
          <select>
            {gamesToday.map((gameToday, i) => (
              <option value={i}>
                {gameToday.teams.away.team.name} vs{" "}
                {gameToday.teams.home.team.name}
              </option>
            ))}
          </select>
        <ChevronDownIcon className="select-arrow"/>
        </div>
        <button className="game-lobby-form-button">Submit</button>
      </form>
    </div>
  );
}

export default CreateGameLobby;

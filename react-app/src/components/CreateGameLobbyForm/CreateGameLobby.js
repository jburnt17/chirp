import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../../store/games";

function CreateGameLobby({gamesToday}) {

  const [gameOption, setGameOption] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(gameOption));
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => setGameOption(e.target.value)}
      >
        <select>
          {gamesToday.map((gameToday, i) => (
            <option value={i}>
              {gameToday.teams.away.team.name} vs{" "}
              {gameToday.teams.home.team.name}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateGameLobby;

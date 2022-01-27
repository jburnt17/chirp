import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodaysGames } from "../../store/todaysGames";
import CreateGameLobby from "../CreateGameLobbyForm/CreateGameLobby";
import "./CreateLobbyModal.css";

function CreateLobbyModal() {
  const dispatch = useDispatch();
  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gamesToday = Object.values(gamesTodayObj);

  useEffect(() => {
    dispatch(getTodaysGames());
  }, []);

  return (
    <div className="lobby-modal-bg">
      <div className="lobby-modal">
        <CreateGameLobby gamesToday={gamesToday} className="modal-form"/>
      </div>
    </div>
  );
}

export default CreateLobbyModal;

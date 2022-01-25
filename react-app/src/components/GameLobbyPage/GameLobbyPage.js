import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGames } from "../../store/games";
import {
  createChirp,
  deleteChirp,
  loadChirps,
  updateChirp,
} from "../../store/chirps";
import { getTodaysGames } from "../../store/todaysGames";
import NavBar from "../NavBar/NavBar";
import TodaysGames from "../TodaysGames/TodaysGames";
import "./GameLobbyPage.css";
import { XCircleIcon } from "@heroicons/react/outline";
import Test from "../LiveChat/LiveChat";

function GameLobbyPage({ users }) {
  const dispatch = useDispatch();
  const { gameNumber, gameId } = useParams();
  const [content, setContent] = useState("");
  const [editState, setEditState] = useState(false);
  const [editChirpId, setEditChirpId] = useState();
  const [live, setLive] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const gamesTodayObj = useSelector((state) => state.gamesToday);
  const gameLobbiesObj = useSelector((state) => state.gameLobbies);
  const gameLobbyChirpsObj = useSelector((state) => state.chirps);

  const gamesToday = Object.values(gamesTodayObj);
  const gameLobbies = Object.values(gameLobbiesObj);
  const unfilteredChirps = Object.values(gameLobbyChirpsObj);
  const gameLobbyChirps = unfilteredChirps.filter(
    (chirp) => +chirp.game_id === +gameId
  );

  const game = gamesToday[gameNumber];
  const teams = game?.teams;
  let home, away;
  teams && (home = teams.home);
  teams && (away = teams.away);

  const handleEditState = (content, chirpId) => {
    const textArea = document.querySelector("#chirp-text-area");
    setEditChirpId(chirpId);
    setContent(content);
    setEditState(true);
    textArea?.focus();
  };

  const handleChirpSubmit = (e) => {
    e.preventDefault();
    dispatch(createChirp(gameId, content));
    setContent("");
  };

  const handleEnter = (e) => {
    const textArea = document.querySelector(".chirp-bottom-input");
    if (e?.charCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (editState) {
        dispatch(updateChirp(gameId, editChirpId, content));
        setContent("");
        setEditState(false);
      } else {
        dispatch(createChirp(gameId, content));
        setContent("");
      }
    }
  };

  const handleEditChirp = (e) => {
    e.preventDefault();
    dispatch(updateChirp(gameId, editChirpId, content));
    setContent("");
    setEditState(false);
  };

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
    dispatch(loadChirps(gameId));
  }, []);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getTodaysGames());
  }, [dispatch]);

  return (
    <div className="game-lobby-page-body">
      <div className="game-lobby-left">
        <NavBar />
      </div>
      <div className="game-lobby-middle">
        <div className="game-lobby-teams">
          <div className="game-lobby-team-info">
            <div className="game-lobby-team-stats">
              {home && home.team.name !== "Seattle Kraken" ? (
                <img
                  id="game-lobby-home-logo"
                  width={128}
                  src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${home?.team.id}.svg
`}
                />
              ) : (
                <img
                  className="kraken-logo"
                  width={58}
                  src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${home?.team.id}.svg
`}
                />
              )}
              <div className="game-lobby-home-name">
                {home && home.team.name}
              </div>
              <div className="game-lobby-home-record">
                {home &&
                  `${home.leagueRecord.wins} - ${home.leagueRecord.losses} - ${home.leagueRecord.ot}`}
              </div>
            </div>
            <div className="game-lobby-score">{home && home.score}</div>
          </div>
          {!live ? (
            <button className="live-chat-button" onClick={() => setLive(true)}>
              Enter Live Chat
            </button>
          ) : (
            <button
              className="exit-live-chat-button"
              onClick={() => setLive(false)}
            >
              Exit Live Chat
            </button>
          )}
          <div className="game-lobby-team-info">
            <div className="game-lobby-score">{away && away.score}</div>
            <div className="game-lobby-team-stats">
              {away && away.team.name !== "Seattle Kraken" ? (
                <img
                  id="game-lobby-away-logo"
                  width={128}
                  src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${away?.team.id}.svg
`}
                />
              ) : (
                <img
                  className="kraken-logo"
                  width={58}
                  src={`https://www-league.nhlstatic.com/images/logos/teams-20202021-light/${away?.team.id}.svg
`}
                />
              )}
              <div className="game-lobby-away-name">
                {away && away.team.name}
              </div>
              <div className="game-lobby-away-record">
                {away &&
                  `${away.leagueRecord.wins} - ${away.leagueRecord.losses} - ${away.leagueRecord.ot}`}
              </div>
            </div>
          </div>
        </div>
        {!live ? (
          <>
            <div className="chirps-container">
              {gameLobbyChirps.map((chirp) => (
                <div className="individual-chirp">
                  <div className="chirp-user-info">
                    <img
                      className="chirp-avatar"
                      src="https://raw.githubusercontent.com/jburnt17/chirp/80e5df043874ef4ce9a3dd3398a99d070d63fdf5/react-app/public/user-avatar.svg"
                    />
                    <div>
                      <p className="chirp-username">
                        {users &&
                          users.find((user) => user.id === chirp.user_id)
                            .username}
                      </p>
                      <div className="chirp-content">{chirp.content}</div>
                    </div>
                  </div>
                  {chirp.user_id === sessionUser.id && (
                    <div className="chirp-option-buttons">
                      <button
                        onClick={() => dispatch(deleteChirp(gameId, chirp.id))}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-chirp-button"
                        onClick={() => handleEditState(chirp.content, chirp.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="game-lobby-input-container">
              {!editState ? (
                <form
                  className="chirp-bottom-input"
                  onSubmit={(e) => handleChirpSubmit(e)}
                >
                  <textarea
                    onKeyPress={(e) => handleEnter(e)}
                    placeholder="Start chirping..."
                    onChange={(e) => setContent(e.target.value)}
                    type="submit"
                    value={content}
                    id="chirp-text-area"
                  />
                  <button className="reg-chirp-button chirp-button">
                    <PaperAirplaneIcon width={20} />
                  </button>
                </form>
              ) : (
                <form
                  className="chirp-bottom-input"
                  onSubmit={(e) => handleEditChirp(e)}
                >
                  <textarea
                    onKeyPress={(e) => handleEnter(e)}
                    id="chirp-text-area"
                    onChange={(e) => setContent(e.target.value)}
                    type="submit"
                    value={content}
                  />
                  <button
                    className="chirp-button"
                    onClick={() => {
                      setEditState(false);
                      setContent("");
                    }}
                  >
                    <XCircleIcon className="cancel-edit-button" width={28} />
                  </button>
                </form>
              )}
            </div>
          </>
        ) : (
          <Test gameId={gameId} />
        )}
      </div>
      <div className="game-lobby-right">
        <TodaysGames gamesToday={gamesToday} />
      </div>
    </div>
  );
}

export default GameLobbyPage;

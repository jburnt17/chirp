import moment from "moment";
const ADD_GAME = "games/ADD_GAME";
const LOAD_GAMES = "games/LOAD_GAMES";
const DELETE_GAME = "games/DELETE_GAME";

const deleteGame = (game) => ({
  type: DELETE_GAME,
  payload: game,
});

const loadGames = (games) => ({
  type: LOAD_GAMES,
  payload: games,
});

const addGame = (game) => ({
  type: ADD_GAME,
  payload: game,
});

export const removeGame = (gameId) => async (dispatch) => {
  const response = await fetch(`/api/games/${gameId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const gameToDelete = await response.json();
    dispatch(deleteGame(gameToDelete));
    return { message: "successful" };
  }
};

export const getGames = () => async (dispatch) => {
  const response = await fetch("/api/games");
  if (response.ok) {
    const games = await response.json();
    dispatch(loadGames(games));
    return games;
  }
};

export const createGame = (game_number) => async (dispatch) => {
  const response = await fetch("/api/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_number }),
  });
  if (response.ok) {
    const newGame = await response.json();
    dispatch(addGame(newGame));
    return newGame;
  }
};

const handleTime = (postDate) => {
  return moment(postDate)
    .fromNow()
    .split(" ")
    .includes("days" || "day" || "month" || "months");
};

export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case ADD_GAME: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case LOAD_GAMES: {
      const newState = { ...state };
      action.payload.games?.forEach((game) => {
        if (handleTime(game.date)) delete newState[game.id];
        else newState[game.id] = game;
      });
      // action.payload.games?.forEach((game) => (newState[game.id] = game));
      return newState;
    }
    case DELETE_GAME: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default: {
      return state;
    }
  }
}

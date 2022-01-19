const ADD_GAME = "games/ADD_GAME";
const LOAD_GAMES = "games/LOAD_GAMES";

const loadGames = (games) => ({
  type: LOAD_GAMES,
  payload: games,
});

const addGame = (game) => ({
  type: ADD_GAME,
  payload: game,
});

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

export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case ADD_GAME: {
      console.log("action =>", action);
      console.log("payload =>", action.payload);
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case LOAD_GAMES: {
      const newState = { ...state };
      action.payload.games?.forEach((game) => newState[game.id] = game)
      return newState;
    }
    default: {
      return state;
    }
  }
}

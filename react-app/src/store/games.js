const ADD_GAME = "games/ADD_GAME";

const addGame = (game) => ({
  type: ADD_GAME,
  payload: game,
});

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
      console.log('action =>', action)
      console.log('action.payload =>', action.payload)
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    default: {
      return state;
    }
  }
}

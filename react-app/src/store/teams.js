const LOAD_GAMES = "teams/LOAD_GAMES";

const loadGames = (games) => ({
  type: LOAD_GAMES,
  payload: games,
});

export const getTodaysGames = () => async (dispatch) => {
  const response = await fetch('https://statsapi.web.nhl.com/api/v1/schedule')
  const games = await response.json();
  dispatch(loadGames(games))
}

export default function gamesTodayReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_GAMES: {
      console.log(action.payload.dates[0].games)
      const newState = {};
      action.payload.dates[0].games?.forEach((game, i) => newState[i] = game)
      return newState;
    }
    default: {
      return state;
    }
  }
}

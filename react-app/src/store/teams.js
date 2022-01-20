const LOAD_GAMES = "teams/LOAD_GAMES";

const loadGames = (games) => ({
  type: LOAD_GAMES,
  payload: games,
});

export const getTodaysGames = () => async (dispatch) => {
  const date = new Date().toISOString().split('-')
  const response = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date[0]}-${date[1]}-${date[2].slice(0, 2)}`)
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

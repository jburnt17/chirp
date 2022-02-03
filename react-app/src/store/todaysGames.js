const LOAD_GAMES = "teams/LOAD_GAMES";

const loadGames = (games) => ({
  type: LOAD_GAMES,
  payload: games,
});

export const getTodaysGames = () => async (dispatch) => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const newDate = new Date(date.getTime() - offset * 60 * 1000);
  const final = newDate.toISOString().split("T")[0].split("-");
  console.log(final)
  const response = await fetch(
    `https://statsapi.web.nhl.com/api/v1/schedule?date=2022-02-01`
  );
  const games = await response.json();
  dispatch(loadGames(games));
};

export default function gamesTodayReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_GAMES: {
      const newState = {};
      action.payload.dates[0].games?.forEach((game, i) => (newState[i] = game));
      return newState;
    }
    default: {
      return state;
    }
  }
}

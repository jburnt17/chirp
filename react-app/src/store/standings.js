const LOAD_STANDINGS = "teams/LOAD_STANDINGS";

const loadTeams = (teams) => ({
  type: LOAD_STANDINGS,
  payload: teams,
});

export const getStandings = () => async (dispatch) => {
  const response = await fetch("https://statsapi.web.nhl.com/api/v1/standings");
  const standings = await response.json();
  dispatch(loadTeams(standings));
};

export default function standingsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_STANDINGS: {
      const newState = {};
      console.log('action.payload ===>', action.payload.records)
      action.payload.records.forEach((division, i) => newState[i] = division)
      return newState;
    }
    default: {
      return state;
    }
  }
}

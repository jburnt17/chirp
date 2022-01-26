const LOAD_TEAMS = "teams/LOAD_TEAMS";

const loadTeams = (teams) => ({
  type: LOAD_TEAMS,
  payload: teams,
});

export const getTeams = () => async (dispatch) => {
  let teams = [];
  for (let i = 1; i <= 30; i++) {
    if (i !== 11 && i !== 27) {
      const response = await fetch(
        `https://statsapi.web.nhl.com/api/v1/teams/${i}/roster`
      );
      const team = await response.json();
      teams.push(team);
    }
  }
  dispatch(loadTeams(teams))
};

export default function teamsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_TEAMS: {
      const newState = {};
      action.payload.forEach((team, i) => newState[i] = team)
      return newState;
    }
    default: {
      return state;
    }
  }
}

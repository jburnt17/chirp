const ADD_CHIRP = "chirps/ADD_CHIRP";
const GET_CHIRPS = "chirps/GET_CHIRPS";

const addChirp = (chirp) => ({
  type: ADD_CHIRP,
  payload: chirp,
});

const getChirps = (chirps) => ({
  type: GET_CHIRPS,
  payload: chirps,
});

export const createChirp = (chirpId, content) => async (dispatch) => {
  const response = await fetch(`/api/games/${chirpId}/chirps`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (response.ok) {
    const newChirp = await response.json();
    dispatch(addChirp(newChirp));
    return newChirp;
  }
};

export const loadChirps = (chirpId) => async (dispatch) => {
  const response = await fetch(`/api/games/${chirpId}/chirps`);
  if (response.ok) {
    const chirps = await response.json();
    dispatch(getChirps(chirps));
    return chirps;
  }
};

export default function chirpReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHIRPS: {
      const newState = { ...state };
      action.payload.chirps.forEach((chirp) => newState[chirp.id] = chirp)
      return newState;
    }
    case ADD_CHIRP: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    default: {
      return state;
    }
  }
}

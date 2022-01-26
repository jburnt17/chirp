const ADD_CHIRP = "chirps/ADD_CHIRP";
const GET_CHIRPS = "chirps/GET_CHIRPS";
const REMOVE_CHIRP = "chirps/REMOVE_CHIRP";
const EDIT_CHIRP = "chirps/EDIT_CHIRP";

const addChirp = (chirp) => ({
  type: ADD_CHIRP,
  payload: chirp,
});

const getChirps = (chirps) => ({
  type: GET_CHIRPS,
  payload: chirps,
});

const removeChirp = (chirp) => ({
  type: REMOVE_CHIRP,
  payload: chirp,
});

const editChirp = (chirp) => ({
  type: EDIT_CHIRP,
  payload: chirp,
});

export const updateChirp = (game_id, chirp_id, content) => async (dispatch) => {
  const response = await fetch(`/api/games/${game_id}/chirps/${chirp_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (response.ok) {
    const chirpToEdit = await response.json();
    dispatch(editChirp(chirpToEdit));
    return chirpToEdit;
  }
};

export const createChirp = (gameId, content) => async (dispatch) => {
  const response = await fetch(`/api/games/${gameId}/chirps`, {
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

export const loadChirps = (gameId) => async (dispatch) => {
  const response = await fetch(`/api/games/${gameId}/chirps`);
  if (response.ok) {
    const chirps = await response.json();
    dispatch(getChirps(chirps));
    return chirps;
  }
};

export const deleteChirp = (game_id, chirp_id) => async (dispatch) => {
  const response = await fetch(`/api/games/${game_id}/chirps/${chirp_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const chirpToDelete = await response.json();
    dispatch(removeChirp(chirpToDelete));
    return chirpToDelete;
  }
};

export default function chirpReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHIRPS: {
      const newState = { ...state };
      action.payload.chirps.forEach((chirp) => (newState[chirp.id] = chirp));
      return newState;
    }
    case REMOVE_CHIRP: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case EDIT_CHIRP: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
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

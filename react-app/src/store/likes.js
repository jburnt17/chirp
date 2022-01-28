const GET_LIKES = "likes/GET_LIKES";
const POST_LIKE = "likes/POST_LIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";

const getLikes = (likes) => ({
  type: GET_LIKES,
  payload: likes,
});

const postLike = (likes) => ({
  type: POST_LIKE,
  payload: likes,
});

const deleteLike = (likes) => ({
  type: DELETE_LIKE,
  payload: likes,
});

export const fetchLikes = () => async (dispatch) => {
  const response = await fetch("/api/likes");
  console.log(response);
  if (response.ok) {
    const likes = await response.json();
    dispatch(getLikes(likes));
  }
};

export const setLike = (chirp_id) => async (dispatch) => {
  const response = await fetch(`/api/likes/${chirp_id}`, {
    method: "POST",
  });
  if (response.ok) {
    const likes = await response.json();
    dispatch(postLike(likes));
  }
};

export const removeLike = (chirp_id) => async (dispatch) => {
  const response = await fetch(`/api/likes/${chirp_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const chirpToUnlike = await response.json();
    dispatch(deleteLike(chirpToUnlike));
  }
};

export default function likesReducer(state = {}, action) {
  switch (action.type) {
    case GET_LIKES: {
      const newState = {};
      action.payload.likes.forEach((like) => (newState[like.id] = like));
      return newState;
    }
    case POST_LIKE: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_LIKE: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default: {
      return state;
    }
  }
}

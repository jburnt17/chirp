import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import chirpReducer from "./chirps";
import gameReducer from "./games";
import likesReducer from "./likes";
import session from "./session";
import standingsReducer from "./standings";
import teamsReducer from "./teams";
import gamesTodayReducer from "./todaysGames";

const rootReducer = combineReducers({
  session,
  gamesToday: gamesTodayReducer,
  gameLobbies: gameReducer,
  chirps: chirpReducer,
  teams: teamsReducer,
  standings: standingsReducer,
  likes: likesReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

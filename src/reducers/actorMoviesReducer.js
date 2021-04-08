import * as TYPES from '../actions/types';

const actorMoviesReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_ACTOR_MOVIES:
      return { ...state, ...action.payload };
    case TYPES.FETCH_ACTOR_MOVIES_LOAD:
      return { ...state, loading: true };
    case TYPES.FETCH_ACTOR_MOVIES_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default actorMoviesReducer;

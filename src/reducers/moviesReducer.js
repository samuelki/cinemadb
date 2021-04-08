import * as TYPES from '../actions/types';

const moviesReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_MOVIES_EXPLORE:
      return { ...state, ...action.payload };
    case TYPES.FETCH_MOVIES_GENRE:
      return { ...state, ...action.payload };
    case TYPES.FETCH_MOVIES_SEARCH:
      return { ...state, ...action.payload };
    case TYPES.FETCH_MOVIES_LOAD:
      return { ...state, loading: true };
    case TYPES.FETCH_MOVIES_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default moviesReducer;

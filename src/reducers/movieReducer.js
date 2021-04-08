import * as TYPES from '../actions/types';

const movieReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_MOVIE:
      return { ...state, ...action.payload };
    case TYPES.FETCH_CAST:
      return { ...state, cast: action.payload };
    case TYPES.FETCH_MOVIE_LOAD:
      return { ...state, loading: true };
    case TYPES.FETCH_MOVIE_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default movieReducer;

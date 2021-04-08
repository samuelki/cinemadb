import * as TYPES from '../actions/types';

const recommendedReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_RECOMMENDED:
      return { ...state, ...action.payload };
    case TYPES.FETCH_RECOMMENDED_LOAD:
      return { ...state, loading: true };
    case TYPES.FETCH_RECOMMENDED_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default recommendedReducer;

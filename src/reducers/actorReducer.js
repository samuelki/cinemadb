import * as TYPES from '../actions/types';

const actorReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_ACTOR:
      return { ...state, ...action.payload };
    case TYPES.FETCH_ACTOR_LOAD:
      return { ...state, loading: true };
    case TYPES.FETCH_ACTOR_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default actorReducer;

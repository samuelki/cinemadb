import * as TYPES from '../actions/types';

const errorReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_ERROR:
      return action.payload;
    case TYPES.CLEAR_ERROR:
      return [];
    default:
      return state;
  }
};

export default errorReducer;

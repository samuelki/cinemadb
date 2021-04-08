import * as TYPES from '../actions/types';

const INITIAL_STATE = {
  exploreCategories: ['Popular', 'Upcoming', 'Top Rated'],
  loading: true,
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_CONFIG:
      return { ...state, base: action.payload };
    case TYPES.GET_GENRES:
      return { ...state, ...action.payload };
    case TYPES.INIT_LOAD:
      return { ...state, loading: true };
    case TYPES.INIT_FINISH:
      return { ...state, loading: false };
    case TYPES.MENU_SELECT:
      return { ...state, selected: action.payload };
    case TYPES.REMOVE_MENU_SELECT:
      return { ...state, selected: null };
    default:
      return state;
  }
};

export default configReducer;

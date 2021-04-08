import { combineReducers } from 'redux';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import actorReducer from './actorReducer';
import recommendedReducer from './recommendedReducer';
import actorMoviesReducer from './actorMoviesReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  config: configReducer,
  movies: moviesReducer,
  movie: movieReducer,
  actor: actorReducer,
  recommended: recommendedReducer,
  actorMovies: actorMoviesReducer,
  errors: errorReducer,
});

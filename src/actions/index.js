import api from '../api/tmdb';
import history from '../history';
import * as TYPES from './types';

// Initialize with config and genres
export const init = () => async dispatch => {
  dispatch({ type: TYPES.INIT_LOAD });
  await dispatch(getConfig());
  await dispatch(getGenres());
  dispatch({ type: TYPES.INIT_FINISH });
};

export const getConfig = () => async dispatch => {
  const response = await api.get('/configuration');
  dispatch({ type: TYPES.GET_CONFIG, payload: response.data });
};

export const getGenres = () => async dispatch => {
  const response = await api.get('/genre/movie/list');
  dispatch({ type: TYPES.GET_GENRES, payload: response.data });
};

// Fetch movies list
export const fetchMoviesExplore = (name, page) => async (
  dispatch,
  getState
) => {
  const { selected } = getState().config;
  if (!selected) return;
  try {
    dispatch({ type: TYPES.FETCH_MOVIES_LOAD });
    const response = await api.get(`/movie/${name}`, {
      params: {
        page,
      },
    });
    await dispatch({
      type: TYPES.FETCH_MOVIES_EXPLORE,
      payload: response.data,
    });
    dispatch({ type: TYPES.FETCH_MOVIES_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch movies by genre
export const fetchMoviesGenre = (name, page, sort) => async (
  dispatch,
  getState
) => {
  const { selected, genres } = getState().config;
  if (!selected) return;

  try {
    dispatch({ type: TYPES.FETCH_MOVIES_LOAD });
    const genreId = genres
      .filter(genre => genre.name === name)
      .map(genre => genre.id)
      .join('');
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: sort,
      },
    });
    await dispatch({ type: TYPES.FETCH_MOVIES_GENRE, payload: response.data });
    dispatch({ type: TYPES.FETCH_MOVIES_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch movies by search
export const fetchMoviesSearch = (query, page) => async dispatch => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIES_LOAD });
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    await dispatch({
      type: TYPES.FETCH_MOVIES_SEARCH,
      payload: response.data,
    });
    dispatch({ type: TYPES.FETCH_MOVIES_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch movie
export const fetchMovie = id => async dispatch => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIE_LOAD });
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    });
    await dispatch({
      type: TYPES.FETCH_MOVIE,
      payload: response.data,
    });
    await dispatch(fetchMovieCredits());
    dispatch({ type: TYPES.FETCH_MOVIE_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch cast and crew for a movie
export const fetchMovieCredits = () => async (dispatch, getState) => {
  const { id } = getState().movie;

  try {
    const response = await api.get(`/movie/${id}/credits`);
    dispatch({ type: TYPES.FETCH_CAST, payload: response.data.cast });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch list of recommended movies for a movie
export const fetchRecommended = (id, page) => async dispatch => {
  try {
    dispatch({ type: TYPES.FETCH_RECOMMENDED_LOAD });
    const response = await api.get(`/movie/${id}/recommendations`, {
      params: {
        page,
      },
    });
    await dispatch({ type: TYPES.FETCH_RECOMMENDED, payload: response.data });
    dispatch({ type: TYPES.FETCH_RECOMMENDED_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch actor details
export const fetchActor = id => async dispatch => {
  try {
    dispatch({ type: TYPES.FETCH_ACTOR_LOAD });
    const response = await api.get(`/person/${id}`);
    await dispatch({ type: TYPES.FETCH_ACTOR, payload: response.data });
    dispatch({ type: TYPES.FETCH_ACTOR_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Fetch movies by actor
export const fetchActorMovies = (id, page, sort) => async dispatch => {
  try {
    dispatch({ type: TYPES.FETCH_ACTOR_MOVIES_LOAD });
    const response = await api.get(`/discover/movie`, {
      params: {
        with_cast: id,
        page,
        sort_by: sort,
      },
    });
    await dispatch({
      type: TYPES.FETCH_ACTOR_MOVIES,
      payload: response.data,
    });
    dispatch({ type: TYPES.FETCH_ACTOR_MOVIES_FINISH });
  } catch (error) {
    dispatch({ type: TYPES.ADD_ERROR, payload: error.response });
    history.push('/error');
  }
};

// Select a genre or explore in menu
export const selectMenu = selected => (dispatch, getState) => {
  const { exploreCategories, genres } = getState().config;
  if (!selected) {
    dispatch({ type: TYPES.REMOVE_MENU_SELECT });
  } else if (
    exploreCategories.find(category => category === selected) ||
    genres.find(genre => genre.name === selected)
  ) {
    dispatch({ type: TYPES.MENU_SELECT, payload: selected });
  } else {
    history.push('/error');
  }
};

// Used to set loading to true
export const clearMovies = () => {
  return {
    type: TYPES.FETCH_MOVIES_LOAD,
  };
};
export const clearMovie = () => {
  return {
    type: TYPES.FETCH_MOVIE_LOAD,
  };
};
export const clearActor = () => {
  return {
    type: TYPES.FETCH_ACTOR_LOAD,
  };
};
export const clearActorMovies = () => {
  return {
    type: TYPES.FETCH_ACTOR_MOVIES_LOAD,
  };
};
export const clearRecommendations = () => {
  return {
    type: TYPES.FETCH_RECOMMENDED_LOAD,
  };
};

export const clearError = () => ({ type: TYPES.CLEAR_ERROR });

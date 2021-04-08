import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import Header from '../components/Header';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';

import { selectMenu, fetchMoviesExplore, clearMovies } from '../actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Explore = ({
  config,
  movies,
  match,
  location,
  selectMenu,
  fetchMoviesExplore,
  clearMovies,
}) => {
  const params = queryString.parse(location.search);
  const { secure_base_url } = config.base.images;

  useEffect(() => {
    selectMenu(match.params.name);
    return () => selectMenu();
  }, [match.params.name, selectMenu]);

  useFetchMoviesExplore(
    match.params.name,
    fetchMoviesExplore,
    params,
    clearMovies
  );

  if (movies.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${config.selected} Movies`}</title>
      </Helmet>
      <Header title={config.selected} subtitle="movies" />
      <MoviesList movies={movies} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

const useFetchMoviesExplore = (
  name,
  fetchMoviesExplore,
  params,
  clearMovies
) => {
  const query = name.replace(/\s+/g, '_').toLowerCase();
  useEffect(() => {
    scroll.scrollToTop({ smooth: true });
    fetchMoviesExplore(query, params.page);
    return () => clearMovies();
  }, [query, params.page, fetchMoviesExplore, clearMovies]);
};

const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, {
  selectMenu,
  fetchMoviesExplore,
  clearMovies,
})(Explore);

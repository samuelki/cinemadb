import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import MoviesList from '../components/MoviesList';
import SortBy from '../components/SortBy';
import Loader from '../components/Loader';

import { selectMenu, fetchMoviesGenre, clearMovies } from '../actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Genre = ({
  config,
  match,
  movies,
  location,
  selectMenu,
  fetchMoviesGenre,
  clearMovies,
}) => {
  const [option, setOption] = useState({
    value: 'popularity.desc',
    label: 'Popularity',
  });
  const params = queryString.parse(location.search);
  const { secure_base_url } = config.base.images;

  // Check to see if genre in url is valid
  useEffect(() => {
    selectMenu(match.params.name);
    return () => selectMenu();
  }, [match.params.name, selectMenu]);

  useFetchMoviesGenre(
    match.params.name,
    fetchMoviesGenre,
    params,
    option,
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
      <SortBy option={option} setOption={setOption} />
      <MoviesList movies={movies} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

const useFetchMoviesGenre = (
  genre,
  fetchMoviesGenre,
  params,
  sortByOption,
  clearMovies
) => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    fetchMoviesGenre(genre, params.page, sortByOption.value);
    return () => clearMovies;
  }, [genre, params.page, sortByOption, fetchMoviesGenre, clearMovies]);
};

const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, {
  selectMenu,
  fetchMoviesGenre,
  clearMovies,
})(Genre);

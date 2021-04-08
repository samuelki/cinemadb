import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';

import { fetchMoviesSearch, clearMovies } from '../actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = ({
  config,
  match,
  location,
  fetchMoviesSearch,
  clearMovies,
  movies,
}) => {
  const { query } = match.params;
  const params = queryString.parse(location.search);
  const { secure_base_url } = config.base.images;

  useFetchMoviesSearch(query, fetchMoviesSearch, params, clearMovies);

  if (movies.loading) {
    return <Loader />;
  } else if (movies.total_results === 0) {
    return <NotFound title="Sorry!" subtitle={`No results for ${query}...`} />;
  } else {
    return (
      <Wrapper>
        <Helmet>
          <title>{`${query} - Search Results`}</title>
        </Helmet>
        <Header title={query} subtitle="Search Results" />
        <MoviesList movies={movies} baseUrl={secure_base_url} />;
      </Wrapper>
    );
  }
};

function useFetchMoviesSearch(query, fetchMoviesSearch, params, clearMovies) {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    fetchMoviesSearch(query, params.page);
    return () => clearMovies();
  }, [query, params.page, clearMovies, fetchMoviesSearch]);
}

const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, { fetchMoviesSearch, clearMovies })(
  Search
);

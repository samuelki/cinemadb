import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

import TmdbLogo from '../svg/tmdb.svg';
import MenuItem from '../components/MenuItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid var(--border-color);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

const Svg = styled.img`
  max-width: 100%;
  height: 3rem;
`;

const Sidebar = ({ genres, exploreCategories, selected }) => {
  return (
    <StickyBox>
      <Wrapper>
        <Heading>Explore</Heading>
        {renderExplore(exploreCategories, selected)}
        <Heading>Genres</Heading>
        {renderGenres(genres, selected)}
        <Svg
          src={`${TmdbLogo}`}
          alt="The Movie Database"
          style={{ margin: '2rem 0' }}
        />
      </Wrapper>
    </StickyBox>
  );
};

function renderExplore(categories, selected, setisOpened) {
  return categories.map((category, i) => (
    <LinkWrap
      to={`/explore/${category}`}
      key={i}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={category}
        selected={category === selected ? true : false}
      />
    </LinkWrap>
  ));
}

function renderGenres(genres, selected, setisOpened) {
  return genres.map(genre => (
    <LinkWrap
      to={`/genres/${genre.name}`}
      key={genre.id}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={genre.name}
        selected={genre.name === selected ? true : false}
      />
    </LinkWrap>
  ));
}

const mapStateToProps = ({ config }) => {
  return {
    exploreCategories: config.exploreCategories,
    genres: config.genres,
    selected: config.selected,
  };
};

export default connect(mapStateToProps)(Sidebar);

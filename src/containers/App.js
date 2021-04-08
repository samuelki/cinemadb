import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import { init } from '../actions';

import Explore from './Explore';
import MenuMobile from './MenuMobile';
import Movie from './Movie';
import Genre from './Genre';
import SideBar from './SideBar';
import Search from './Search';
import Person from './Person';
import ShowError from './ShowError';

import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  faStar as fasFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';

library.add(
  fab,
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  fasFaStar,
  farFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay,
  faUserTimes
);

const MainWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;
  @media ${props => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
`;

const App = ({ init, isLoading }) => {
  useEffect(() => {
    init();
  }, [init]);
  const [isMobile, setisMobile] = useState(null);

  // Set amount of items to show on slider based on the width of the element
  const changeMobile = () => {
    window.matchMedia('(max-width: 80em)').matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener('resize', changeMobile);
    return () => window.removeEventListener('resize', changeMobile);
  }, []);

  return isLoading ? (
    <ContentWrapper>
      <Loader />
    </ContentWrapper>
  ) : (
    <Router history={history}>
      <React.Fragment>
        <MainWrapper isMobile={isMobile}>
          {isMobile ? (
            <MenuMobile />
          ) : (
            <div>
              <SideBar />
              <SearchBarWrapper>
                <SearchBar />
              </SearchBarWrapper>
            </div>
          )}
          <ContentWrapper>
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Redirect from="/" to="/explore/Popular" />}
              />
              <Route path="/explore/:name" exact component={Explore} />
              <Route path="/genres/:name" exact component={Genre} />
              <Route path="/movie/:id" exact component={Movie} />
              <Route path="/person/:id" exact component={Person} />
              <Route path="/search/:query" exact component={Search} />
              <Route path="/error" exact component={ShowError} />
              <Route
                path="/404"
                component={() => (
                  <NotFound title="Oops!" subtitle={`Page does not exist...`} />
                )}
              />
            </Switch>
          </ContentWrapper>
        </MainWrapper>
      </React.Fragment>
    </Router>
  );
};

const mapStateToProps = ({ config }) => {
  return { isLoading: config.loading };
};

export default connect(mapStateToProps, { init })(App);

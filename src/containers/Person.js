import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import queryString from 'query-string';
import LazyLoad from 'react-lazyload';
import history from '../history';
import { Element, animateScroll as scroll } from 'react-scroll';

import MoviesList from '../components/MoviesList';
import SortBy from '../components/SortBy';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Button from '../components/Button';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import UserAvatar from '../svg/user.svg';

import {
  fetchActor,
  clearActor,
  fetchActorMovies,
  clearActorMovies,
} from '../actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const PersonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 7rem;
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
  @media ${props => props.theme.mediaQueries.largest} {
    max-width: 105rem;
  }
  @media ${props => props.theme.mediaQueries.larger} {
    max-width: 110rem;
    margin-bottom: 6rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    max-width: 110rem;
    margin-bottom: 5rem;
  }
  @media ${props => props.theme.mediaQueries.medium} {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const PersonDetails = styled.div`
  width: 60%;
  padding: 4rem;
  flex: 1 1 60%;
  @media ${props => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    padding: 2rem;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }
  @media ${props => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }
  @media ${props => props.theme.mediaQueries.medium} {
    width: 100%;
    flex: 1 1 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 40%;
  flex: 1 1 40%;
  padding: 4rem;
  @media ${props => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    padding: 2rem;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    margin-bottom: 2rem;
  }
  @media ${props => props.theme.mediaQueries.medium} {
    width: 60%;
    flex: 1 1 60%;
  }
`;

const MovieImg = styled.img`
  max-height: 100%;
  height: ${props => (props.error ? '58rem' : 'auto')};
  object-fit: ${props => (props.error ? 'contain' : 'cover')};
  padding: ${props => (props.error ? '2rem' : '')};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${props =>
    props.error ? 'none' : '0rem 2rem 5rem var(--shadow-color-dark);'};
`;

const ImgLoading = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  @media ${props => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 700;
  color: var(--color-primary);
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftButtons = styled.div`
  margin-right: auto;
  display: flex;
  @media ${props => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }
  & > *:not(:last-child) {
    margin-right: 2rem;
    @media ${props => props.theme.mediaQueries.large} {
      margin-right: 1rem;
    }
  }
`;

const AWrapper = styled.a`
  text-decoration: none;
`;

const Person = ({
  location,
  config,
  match,
  fetchActor,
  clearActor,
  fetchActorMovies,
  clearActorMovies,
  actor,
  actorMovies,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { secure_base_url } = config.base.images;
  const params = queryString.parse(location.search);
  const [option, setOption] = useState({
    value: 'popularity.desc',
    label: 'Popularity',
  });

  // Fetch actor in url
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    fetchActor(match.params.id);
    return () => clearActor();
  }, [match.params.id, clearActor, fetchActor]);

  // Fetch actor's movies
  useEffect(() => {
    fetchActorMovies(match.params.id, params.page, option.value);
    return () => clearActorMovies();
  }, [
    params.page,
    option,
    clearActorMovies,
    fetchActorMovies,
    match.params.id,
  ]);

  if (actor.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${actor.name}`}</title>
      </Helmet>
      <LazyLoad height={500}>
        <PersonWrapper>
          {!loaded ? (
            <ImgLoading>
              <Loading />
            </ImgLoading>
          ) : null}
          <ImageWrapper style={!loaded ? { display: 'none' } : {}}>
            <MovieImg
              error={error ? 1 : 0}
              src={`${secure_base_url}w780${actor.profile_path}`}
              onLoad={() => setLoaded(true)}
              onError={e => {
                setError(true);
                if (e.target.src !== `${UserAvatar}`) {
                  e.target.src = `${UserAvatar}`;
                }
              }}
            />
          </ImageWrapper>
          <PersonDetails>
            <HeaderWrapper>
              <Header size="2" title={actor.name} subtitle="" />
            </HeaderWrapper>
            <DetailsWrapper>
              {renderDate(actor.birthday, actor.deathday)}
            </DetailsWrapper>
            <Heading>Bio</Heading>
            <Text>
              {actor.biography ? actor.biography : 'Bio unavailable...'}
            </Text>
            <ButtonsWrapper>
              <LeftButtons>
                {renderImdb(actor.imdb_id)}
                {renderWebsite(actor.homepage)}
              </LeftButtons>
              {renderBack()}
            </ButtonsWrapper>
          </PersonDetails>
        </PersonWrapper>
      </LazyLoad>
      <Header title="Also in" subtitle="movies" />
      {renderPersonMovies(actorMovies, secure_base_url, option, setOption)}
    </Wrapper>
  );
};

function renderDate(birthday, deathday) {
  if (!birthday) {
    return null;
  } else if (birthday && deathday) {
    return `${birthday} - ${deathday}`;
  } else {
    return birthday;
  }
}

// Render back button
function renderBack() {
  if (history.action === 'PUSH') {
    return (
      <div onClick={history.goBack}>
        <Button title="Back" solid left icon="arrow-left" />
      </div>
    );
  }
}

// Render actor website
function renderWebsite(link) {
  if (!link) {
    return null;
  }
  return (
    <AWrapper target="_blank" href={link}>
      <Button title="Website" icon="link" />
    </AWrapper>
  );
}

// Render imdb profile of actor
function renderImdb(id) {
  if (!id) {
    return null;
  }
  return (
    <AWrapper target="_blank" href={`https://www.imdb.com/name/${id}`}>
      <Button title="IMDB" icon={['fab', 'imdb']} />
    </AWrapper>
  );
}

// Render actor's other movies
function renderPersonMovies(actorMovies, base_url, option, setOption) {
  if (actorMovies.loading) {
    return <Loader />;
  } else if (actorMovies.total_results === 0) {
    return (
      <NotFound title="Sorry!" subtitle={`There are no other movies...`} />
    );
  } else {
    return (
      <React.Fragment>
        <SortBy option={option} setOption={setOption} />
        <Element name="scroll-to-element">
          <MoviesList movies={actorMovies} baseUrl={base_url} />;
        </Element>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ actor, config, actorMovies }) => ({
  actor,
  config,
  actorMovies,
});

export default connect(mapStateToProps, {
  fetchActor,
  clearActor,
  fetchActorMovies,
  clearActorMovies,
})(Person);

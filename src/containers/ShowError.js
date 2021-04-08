import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import history from '../history';
import { animateScroll as scroll } from 'react-scroll';

import Button from '../components/Button';

import { clearError } from '../actions';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  @media ${props => props.theme.mediaQueries.medium} {
    width: 65%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-weight: 300;
  font-size: 3.5rem;
`;

const SubTitle = styled.h2`
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.8rem;
`;

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const ShowError = ({ errors, clearError }) => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    return () => clearError();
  }, [clearError]);

  if (errors.length === 0) {
    history.push(`/`);
    return null;
  }
  return (
    <Wrapper>
      <Helmet>
        <title>Oops!</title>
      </Helmet>
      <TitleWrapper>
        <Title>Something went wrong!</Title>
        <SubTitle>{errors.data.status_message}</SubTitle>
      </TitleWrapper>
      <LinkWrapper to={`/`}>
        <Button title="Home" solid icon="home" left />
      </LinkWrapper>
    </Wrapper>
  );
};

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps, { clearError })(ShowError);

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UserAvatar from '../svg/user.svg';

const LinkWrapper = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.loaded ? '1' : '0')}
  visibility: ${props => (props.loaded ? 'visible' : 'hidden')}
`;

const MovieImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: transparent;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const CastItem = ({ actor, baseUrl }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <LinkWrapper loaded={loaded ? 1 : 9} to={`/person/${actor.id}`}>
      <MovieImg
        src={`${baseUrl}w185${actor.profile_path}`}
        onLoad={() => setLoaded(true)}
        onError={e => {
          if (e.target.src !== `${UserAvatar}`) {
            e.target.src = `${UserAvatar}`;
          }
        }}
      />
    </LinkWrapper>
  );
};

export default CastItem;

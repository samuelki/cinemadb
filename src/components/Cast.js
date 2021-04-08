import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Loader from './Loader';
import CastItem from './CastItem';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Cast = ({ cast, baseUrl }) => {
  const [totalShow, setTotalShow] = useState(null);
  const sliderElement = useRef();

  // Change how much of the cast is shown
  const changeTotalShow = () => {
    let totalItems = Math.round(sliderElement.current.offsetWidth / 70);
    if (totalItems > cast.length) {
      totalItems = cast.length;
    }
    setTotalShow(totalItems);
  };

  const items = cast.map(actor => (
    <CastItem key={actor.id} actor={actor} baseUrl={baseUrl} />
  ));

  useEffect(() => {
    changeTotalShow();
    window.addEventListener('resize', changeTotalShow);
    return () => window.removeEventListener('resize', changeTotalShow);
  });

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: totalShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!cast) {
    return <Loader />;
  }

  return (
    <Wrapper ref={sliderElement}>
      <Slider {...settings}>{items}</Slider>
    </Wrapper>
  );
};

function NextArrow({ onClick }) {
  return (
    <FontAwesomeIcon
      style={{
        right: '-15px',
        position: 'absolute',
        top: '50%',
        display: 'block',
        width: '12px',
        height: '12px',
        padding: '0',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      icon={'chevron-right'}
      size="1x"
    />
  );
}

function PrevArrow({ onClick }) {
  return (
    <FontAwesomeIcon
      style={{
        left: '-15px',
        position: 'absolute',
        top: '50%',
        display: 'block',
        width: '12px',
        height: '12px',
        padding: '0',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      icon={'chevron-left'}
      size="1x"
    />
  );
}

export default Cast;

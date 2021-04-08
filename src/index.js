import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';

import App from './containers/App';
import reducers from './reducers';

import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  button {
    outline: none;
    cursor: pointer;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html {
    font-size: 62.5%; //1rem = 10px
    box-sizing: border-box;
    --color-primary: ${props => props.theme.colors.main};
    --color-primary-dark: ${props => props.theme.colors.dark};
    --color-primary-light: ${props => props.theme.colors.light};
    --color-primary-lighter: ${props => props.theme.colors.lighter};
    --text-color: ${props => props.theme.colors.text};
    --link-color: ${props => props.theme.colors.link};
    --border-color: rgba(176, 190, 197, 0.5);
    --shadow-color: rgba(0, 0, 0, 0.2);
    --shadow-color-dark: rgba(0, 0, 0, 0.25);
    @media ${props => props.theme.mediaQueries.largest} {
        font-size: 57.5%;
    }
    @media ${props => props.theme.mediaQueries.large} {
        font-size: 55%;
    }
  }
  body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
  form,
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`;

const theme = {
  colors: {
    main: '#37474f',
    dark: '#263238',
    light: '#546e7a',
    lighter: '#b0bec5',
    text: '#fafafa',
    link: '#444444',
  },
  size: {
    smallest: '25em', //275px
    smaller: '31.25em', //500px
    small: '37.5em', //600px
    medium: '56.25em', //900px
    large: '80em', //1300px
    larger: '90em', //1300px
    largest: '97em', //1500px
  },
  mediaQueries: {
    smallest: `only screen and (max-width: 25em)`,
    smaller: 'only screen and (max-width: 31.25em)',
    small: 'only screen and (max-width: 37.5em)',
    medium: 'only screen and (max-width: 56.25em)',
    large: 'only screen and (max-width: 80em)',
    larger: 'only screen and (max-width: 90em)',
    largest: 'only screen and (max-width: 97em)',
  },
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>CinemaDB</title>
        </Helmet>
        <App />
        <GlobalStyle />
      </Fragment>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
);

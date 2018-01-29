import React from 'react';
import Helmet from 'react-helmet';
import { site } from '../config';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

// Import global/shared styles.
import '../styles/global/main.css';

export default ({ children }) => [
  <Helmet
    key="app-head"
    titleTemplate={site.title.template}
    defaultTitle={site.title.default}
  >
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>{site.title.default}</title>
  </Helmet>,
  <Header key="app-header" />,
  <Main key="app-main">{children()}</Main>,
  <Footer key="app-footer" />,
];

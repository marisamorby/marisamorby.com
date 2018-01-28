import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

export default ({ children, title, className = '' }) => [
  <Helmet
    key="app-head"
    titleTemplate="%s · Marisa Morby"
    defaultTitle="Marisa Morby — Transformation Designer and UX Researcher"
  >
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>{title}</title>
  </Helmet>,
  <Header key="app-header" />,
  <main key="app-main" className={className}>
    {children}
  </main>,
  <Footer key="app-footer" />,
];

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/main.module.css';

const Main = ({ children }) => <main className={styles.main}>{children}</main>;

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;

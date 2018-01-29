import React from 'react';
import Link from 'gatsby-link';
import { nav } from '../config';
import styles from '../styles/header.module.css';

const Header = () => (
  <header className={styles.header}>
    <nav>
      {nav.map(link => (
        <Link key={`nav-${link.name}`} to={link.path} className={styles.link}>
          {link.name}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;

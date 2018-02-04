import React from 'react';
import Link from 'gatsby-link';
import { nav } from '../config';
import styles from '../styles/footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <nav>
      {nav.map(link => (
        <Link key={`nav-${link.name}`} to={link.path} className={styles.link}>
          {link.name}
        </Link>
      ))}
    </nav>
    <p>All content © Marisa Morby</p>
  </footer>
);

export default Footer;

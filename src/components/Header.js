import React from 'react';
import Link from 'gatsby-link';

const nav = [
  { path: '/', name: 'Home' },
  { path: '/articles', name: 'Articles' },
  { path: '/speaking', name: 'Speaking' },
  { path: '/about', name: 'About' },
];

const Header = () => (
  <header>
    <nav>
      {nav.map(link => (
        <Link key={`nav-${link.name}`} to={link.path}>
          {link.name}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Image from 'gatsby-image';
import SEO from '../components/SEO';
import styles from '../styles/index.module.css';

const Index = ({ data: { page } }) => [
  <Helmet key="home-helmet">
    <body className="home-page" />
  </Helmet>,
  <SEO key="home-seo" data={page} />,
  <section key="home-hero" className={styles.hero}>
    <h1
      className={styles.heading}
      style={{
        'background-image': `
          linear-gradient(#443634, #443634),
          url('${page.frontmatter.image.childImageSharp.sizes.src}')
        `,
      }}
    >
      {page.frontmatter.hero.heading}
    </h1>
    <div
      className={styles.lede}
      style={{
        'background-image': `
        linear-gradient(#443634, #443634),
        url('${page.frontmatter.image.childImageSharp.sizes.src}')
      `,
      }}
    >
      <p
        className={styles.tagline}
        dangerouslySetInnerHTML={{ __html: page.frontmatter.hero.tagline }}
      />
      <p dangerouslySetInnerHTML={{ __html: page.frontmatter.hero.mission }} />
    </div>
    <Image
      className={styles['image-wrapper']}
      sizes={page.frontmatter.image.childImageSharp.sizes}
      alt="Marisa Morby"
    />
  </section>,
  <a key="home-button" className={styles.button} href="#">
    See How
  </a>,
  <section
    key="home-content"
    className={styles.content}
    dangerouslySetInnerHTML={{ __html: page.html }}
  />,
];

Index.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.any.isRequired,
      html: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const query = graphql`
  query IndexQuery {
    page: markdownRemark(id: { regex: "/pages/index/" }) {
      html
      frontmatter {
        title
        hero {
          heading
          tagline
          mission
        }
        image {
          childImageSharp {
            sizes(maxWidth: 690, traceSVG: { color: "#ffdddd" }) {
              src
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default Index;

/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Layout from '../components/Layout';

const Page = ({ data: { post } }) => (
  <Layout title={post.frontmatter.title}>
    <h1>{post.frontmatter.title}</h1>
    <Img
      resolutions={post.frontmatter.image.childImageSharp.resolutions}
      alt={post.frontmatter.title}
    />
    <section
      // className={styles['content-area']}
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  </Layout>
);

Page.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query PostQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            resolutions(width: 400) {
              ...GatsbyImageSharpResolutions_tracedSVG
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;

export default Page;

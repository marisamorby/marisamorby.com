/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

const Page = ({ data: { page } }) => (
  <Layout title={page.frontmatter.title}>
    <h1>{page.frontmatter.title}</h1>
    <section
      // className={styles['content-area']}
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  </Layout>
);

Page.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
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
  query PageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;

export default Page;

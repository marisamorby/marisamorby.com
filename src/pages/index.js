import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

const Index = ({ data: { page, loading } }) => (
  <Layout>
    {loading ? (
      <p>loading...</p>
    ) : (
      <section dangerouslySetInnerHTML={{ __html: page.html }} />
    )}
  </Layout>
);

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
      }
    }
  }
`;

export default Index;

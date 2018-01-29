/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';

const Page = ({ data: { page } }) => [
  <SEO key="page-seo" data={page} />,
  <h1 key="page-heading">{page.frontmatter.title}</h1>,
  <section
    key="page-content"
    dangerouslySetInnerHTML={{ __html: page.html }}
  />,
];

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

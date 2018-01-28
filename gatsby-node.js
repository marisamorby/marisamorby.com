const path = require('path');

const getSlug = (...parts) => `/${parts.filter(Boolean).join('/')}/`;

exports.onCreateNode = ({
  node,
  boundActionCreators: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const fileData = path.parse(fileNode.relativePath);
    const slug = getSlug(fileData.dir, fileData.name);

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) =>
  new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('src/templates/page.js'),
      post: path.resolve('src/templates/post.js'),
    };

    resolve(
      graphql(`
        {
          pages: allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "**/{pages,posts}/**" } }
          ) {
            edges {
              node {
                fileAbsolutePath
                fields {
                  slug
                }
                frontmatter {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.pages.edges.forEach(({ node: page }) => {
          // We manually create this page, so skip it here.
          if (page.fields.slug === '/index/') {
            return;
          }

          const realPath = page.frontmatter.slug || page.fields.slug;
          const type = page.fileAbsolutePath.match(/\/posts\//)
            ? 'post'
            : 'page';

          createPage({
            path: realPath,
            component: templates[type],
            context: {
              slug: page.fields.slug,
            },
          });
        });
      }),
    );
  });

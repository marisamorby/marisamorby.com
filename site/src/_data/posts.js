const { default: slugify } = require('slugify');
const {
  getPosts,
  sortByPublishDateDescending,
  getPostBody,
} = require('../_util/process-posts');

module.exports = async () => {
  const response = await getPosts({
    query: `
      {
          allPosts(where: { postType_not: "note", is_draft: false }) {
              title
              description
              publishedAt
              slug {
                  current
              }
              categories {
                title
              }
              markdown
              bodyRaw
          }
      }
    `,
  });

  const invalidPosts = response.data.allPosts
    .filter(post => !post.slug || post.slug.current === '')
    .map(post => ({ title: post.title }));

  console.log({ invalidPosts });

  const allPosts = response.data.allPosts
    .filter(post => post.slug && post.slug.current !== '')
    .sort(sortByPublishDateDescending)
    .map(getPostBody);

  const posts = allPosts.reduce((acc, p) => {
    const cats = p.categories || [];

    cats.forEach(c => {
      const catSlug = slugify(c.title, { lower: true });
      acc[catSlug] = [...(acc[catSlug] || []), p];
    });

    return acc;
  }, {});

  console.log(Object.keys(posts));

  return {
    all: allPosts,
    ...posts,
  };
};

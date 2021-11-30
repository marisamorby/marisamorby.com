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
              markdown
              bodyRaw
          }
      }
    `,
  });

  const posts = response.data.allPosts
    .filter((post) => post.slug.current !== '')
    .sort(sortByPublishDateDescending)
    .map(getPostBody);

  console.log({ posts });

  return posts;
};

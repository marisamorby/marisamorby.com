const {
  getPosts,
  sortByPublishDateDescending,
  getPostBody,
} = require('../_util/process-posts');

module.exports = async () => {
  const response = await getPosts({
    query: `
      {
        allPosts(where: { postType: "note", is_draft: false }) {
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

  return response.data.allPosts
    .sort(sortByPublishDateDescending)
    .map(getPostBody);
};

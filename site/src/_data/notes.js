const fetch = require('node-fetch');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');

module.exports = async () => {
  const response = await fetch(
    'https://xq50spjj.api.sanity.io/v1/graphql/production/default',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    },
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return response.data.allPosts
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map((post) => ({
      ...post,
      body: post.markdown || BlocksToMarkdown(post.bodyRas),
    }));
};

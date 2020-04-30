const fetch = require('node-fetch');
const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');

const SANITY_PROJECT_ID = 'xq50spjj';
const SANITY_DATASET = 'production';

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
});
const builder = imageUrlBuilder(client);

exports.getPosts = async ({ query }) =>
  await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${SANITY_DATASET}/default`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    },
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

exports.sortByPublishDateDescending = (a, b) =>
  new Date(b.publishedAt) - new Date(a.publishedAt);

exports.getPostBody = (post) => ({
  ...post,
  body:
    post.markdown ||
    BlocksToMarkdown(post.bodyRaw, {
      serializers: {
        types: {
          youtube: ({ node }) => {
            const url = new URL(node.url);
            const videoID = url.searchParams.get('v');

            return `<div class="responsive-embed"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
          },
          twitter: ({ node }) => `<pre>${JSON.stringify(node, null, 2)}</pre>`,
          mainImage: ({ node }) => `
<figure>

  ![${node.alt}](${builder.image(node).width(600).url()})

  <figcaption>${node.caption}</figcaption>
</figure>
          `,
        },
      },
    }),
});

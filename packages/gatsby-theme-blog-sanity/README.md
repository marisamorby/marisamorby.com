# gatsby-theme-blog-sanity

A Gatsby theme to pull blog posts from Sanity.io. This theme doesn’t provide much by way of styling, but it’s hooked up to [`theme-ui`’s Gatsby plugin](https://theme-ui.com/gatsby-plugin) for easy style overrides.

To install:

```bash
# in your Gatsby project, install the theme
yarn add gatsby-theme-blog-sanity
```

Set up your environment variables in `.env.development`:

```bash
# get these values from manage.sanity.io
# REQUIRED
GATSBY_SANITY_PROJECT_ID=xxx
GATSBY_SANITY_DATASET=production

# OPTIONAL — set this if you want live draft updates
SANITY_TOKEN=xxx
```

In your `gatsby-config.js`:
```js
// see https://www.gatsbyjs.org/docs/environment-variables/
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-blog-sanity',
      options: {
        sanity: {
          // get these values from manage.sanity.io
          projectId: process.env.GATSBY_SANITY_PROJECT_ID,
          dataset: process.env.GATSBY_SANITY_DATASET,

          // optional — set this if you want live draft updates
          token: process.env.SANITY_TOKEN,
        }
      }
  ]
}
```

## Options

option               | default                                           | description
-------------------- | ------------------------------------------------- | -----------------------------------------
basePath             | /                                                 | the path where the blog should be created (e.g. `/blog`)
baseUrl              | `window.location.origin`                          | URL used for SEO tags
includePathInPosts   | true                                              | if `false`, blog posts will not include the `basePath` (e.g. `/my-post`); by default, posts include the `basePath` (e.g. `/blog/my-post`)
sanity.projectId     |                                                   | the Sanity project ID from Sanity Studio
sanity.dataset       |                                                   | the Sanity dataset (usually "production" by default)
sanity.token         |                                                   | a Sanity read token (see your [API settings](https://manage.sanity.io))
sanity.watchMode     | `true` in develop if `token` is set, else `false` | when true, updates the UI in real time during development
sanity.overlayDrafts | `true` in develop, `false` in production          | when true, displays draft content

The `sanity` options are passed directly through to `gatsby-source-sanity`. See [the docs](https://github.com/sanity-io/gatsby-source-sanity) for additional information on what these options mean.

### Kitchen sink example

In your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-blog-sanity',
      options: {
        basePath: '/blog',
        baseUrl: 'https://example.com',
        sanity: {
          projectId: 'xxx',
          dataset: 'production',
          token: 'xxx',
          watchMode: true,
          overlayDrafts: false,
        }
      }
    }
  ]
}
```

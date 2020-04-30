export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  initialValue: () => ({
    postType: 'note',
    publishedAt: new Date().toISOString(),
    authors: [
      {
        _type: 'authorReference',
        author: {
          _ref: '1b1c7451-c976-48fd-b416-73bf5a356f10',
          _type: 'reference'
        }
      }
    ]
  }),
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing'
    },
    {
      title: 'Type',
      name: 'postType',
      type: 'string',
      options: {
        list: [
          {title: 'Post', value: 'post'},
          {title: 'Note', value: 'note'}
        ],
        layout: 'radio'
      }
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      name: 'description',
      type: 'text',
      rows: 4,
      title: 'Description',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'authorReference'
        }
      ]
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'markdown',
      type: 'markdown',
      title: 'Body (Markdown)',
      description: 'NOTE: If you use in this field, the “Body” field below will be ignored.'
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body (Legacy)',
      description:
        'This is only here because it would suck to migrate all posts. Probably don’t use this for new posts.'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      const path = `/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Draft'
      }
    }
  }
}

import {
  type BlockObjectResponse,
  type QueryDataSourceParameters,
  Client,
  collectPaginatedAPI,
} from '@notionhq/client';
import { type Loader } from 'astro/loaders';
import { z } from 'astro:content';
import { cloudinary } from '../../util/cloudinary';
import { blocksToHTML } from './render';
import { topics, types } from '../../content.config';

const notion = new Client();

const NotionRichText = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    text: z.object({
      content: z.string(),
      link: z.any().optional(),
    }),
    annotations: z.object({
      bold: z.boolean(),
      italic: z.boolean(),
      strikethrough: z.boolean(),
      underline: z.boolean(),
      code: z.boolean(),
      color: z.string(),
    }),
    plain_text: z.string(),
    href: z.any().optional(),
  }),
]);

const NotionFile = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('file'),
    file: z.object({
      url: z.string().url(),
      expiry_time: z.coerce.date(),
    }),
  }),
  z.object({
    type: z.literal('external'),
    external: z.object({
      url: z.string().url(),
    }),
  }),
]);

const NotionProperty = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('select'),
    id: z.string(),
    select: z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
    }),
  }),
  z.object({
    type: z.literal('multi_select'),
    id: z.string(),
    multi_select: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
      }),
    ),
  }),
  z.object({
    type: z.literal('date'),
    id: z.string(),
    date: z.object({
      start: z.coerce.date(),
      end: z.coerce.date(),
      time_zone: z.coerce.string(),
    }),
  }),
  z.object({
    id: z.string(),
    type: z.literal('button'),
    button: z.object({}),
  }),
  z.object({
    type: z.literal('rich_text'),
    id: z.string(),
    rich_text: z.array(NotionRichText),
  }),
  z.object({
    type: z.literal('title'),
    id: z.string(),
    title: z.array(NotionRichText),
  }),
  z.object({
    type: z.literal('files'),
    id: z.string(),
    files: z.array(NotionFile),
  }),
]);

const NotionPage = z.object({
  object: z.literal('page'),
  id: z.string(),
  created_time: z.coerce.date(),
  last_edited_time: z.coerce.date(),
  created_by: z.object({
    object: z.literal('user'),
    id: z.string(),
  }),
  last_edited_by: z.object({
    object: z.literal('user'),
    id: z.string(),
  }),
  cover: z.any().nullable(),
  icon: z.any().nullable(),
  parent: z.object({
    type: z.string(),
    database_id: z.string(),
  }),
  archived: z.boolean(),
  in_trash: z.boolean(),
  properties: z.record(z.string(), NotionProperty),
  url: z.string().url(),
  public_url: z.string().url().nullable(),
});

const NotionResult = z.object({
  object: z.literal('list'),
  results: z.array(NotionPage),
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
  type: z.string(),
  page_or_database: z.object({}).optional(),
  request_id: z.string(),
});

async function parseNotionProperty(property: z.infer<typeof NotionProperty>) {
  switch (property.type) {
    case 'rich_text':
      return property.rich_text.at(0)?.plain_text ?? '';

    case 'title':
      return property.title.at(0)?.plain_text ?? '';

    case 'date':
      return property.date.start;

    case 'select':
      return property.select.name;

    case 'multi_select':
      return property.multi_select.map((item) => {
        return item.name;
      });

    case 'files':
      const details = property.files.at(0);

      let src;

      try {
        switch (details?.type) {
          // NOTE: this ONLY expects images right now.
          // It will fail if any other file is supplied.
          case 'external':
            src = details.external.url;
            break;

          case 'file':
            src = details.file.url;
            break;

          default:
            throw new Error(
              `unhandled file type ${JSON.stringify(details, null, 2)}`,
            );
        }

        const upload = await cloudinary.uploader.upload(src, {
          overwrite: false,
          use_filename: true,
          unique_filename: false,
        });

        return cloudinary.url(upload.public_id, {
          width: 1600,
          height: 900,
          crop: 'fill',
          gravity: 'faces',
          quality: 'auto',
        });
      } catch (error) {
        console.log(
          `error parsing notion property ${JSON.stringify(property, null, 2)}`,
        );
        console.error(JSON.stringify(error, null, 2));
        return src;
      }

    default:
      console.log(`unhandled property type ${property.type}`);
      return '';
  }
}

export function notionLoader({
  integration_token,
  data_source_id,
  filter,
  sorts,
}: {
  integration_token: string;
} & Pick<QueryDataSourceParameters, 'data_source_id'> &
  Pick<QueryDataSourceParameters, 'filter'> &
  Pick<QueryDataSourceParameters, 'sorts'>): Loader {
  return {
    name: 'notion-loader',
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      publishedAt: z.date(),
      type: z.enum(types),
      topics: z.array(z.enum(topics)).optional().default([]),
      image: z
        .object({
          src: z.string().url(),
          alt: z.string().nullable().optional(),
          caption: z.string().nullable().optional(),
        })
        .optional(),
      description: z.string().optional(),
    }),
    load: async ({ store, logger, parseData, generateDigest }) => {
      const notionResult = await notion.dataSources.query({
        auth: integration_token,
        data_source_id,
        filter,
        sorts,
      });

      try {
        const data = NotionResult.parse(notionResult);
        const pages = data.results;

        logger.info(`loaded ${pages.length} pages from Notion`);

        store.clear();

        await Promise.all(
          pages.map(async (page: any) => {
            const property_title = page.properties['Title'];
            const property_slug = page.properties['Slug'];
            const property_publishDate = page.properties['Publish date'];
            const property_type = page.properties['Type'];
            const property_topics = page.properties['Topics'];
            const property_share_description =
              page.properties['Sharing Description'];
            const property_share_image = page.properties['Sharing image'];
            const property_share_image_alt =
              page.properties['Sharing image alt text'];

            if (property_slug.type !== 'rich_text') {
              console.log('Invalid slug value');
              return;
            }

            const rt = property_slug.rich_text.at(0);

            if (!rt?.plain_text) {
              console.log('Invalid slug value');
              return;
            }

            const [
              title,
              slug,
              publishedAt,
              description,
              imageSrc,
              imageAlt,
              type,
              topics,
              blocks,
            ] = await Promise.all([
              parseNotionProperty(property_title),
              parseNotionProperty(property_slug),
              parseNotionProperty(property_publishDate),
              parseNotionProperty(property_share_description),
              parseNotionProperty(property_share_image),
              parseNotionProperty(property_share_image_alt),
              parseNotionProperty(property_type),
              parseNotionProperty(property_topics),
              collectPaginatedAPI(notion.blocks.children.list, {
                auth: integration_token,
                block_id: page.id,
              }),
            ]);

            console.log(imageSrc);

            const data = await parseData({
              id: rt.plain_text,
              data: {
                title,
                slug,
                publishedAt,
                description,
                type,
                topics,
                image: {
                  src: imageSrc,
                  alt: imageAlt,
                },
              },
            });

            const html = await blocksToHTML(blocks as BlockObjectResponse[]);

            return store.set({
              id: rt.plain_text,
              data,
              body: JSON.stringify(blocks),
              rendered: {
                html,
              },
              digest: generateDigest(data),
            });
          }),
        );
      } catch (err) {
        logger.error(JSON.stringify(err, null, 2));
      }
    },
  };
}

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'astro:content';
import { createClient } from '@sanity/client';
import PortableText from '@sanity/block-content-to-markdown';
import getYTid from 'get-youtube-id';
import { BlogSchema } from '../content.config';

// const BlocksToMarkdown = require("@sanity/block-content-to-markdown");
// const { getImageUrl } = BlocksToMarkdown;
// const config = require("./config");
// const getYTid = require("get-youtube-id");

const config = {
	projectId: import.meta.env.SANITY_PROJECT_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2025-02-06',
	token: process.env.SANITY_READ_TOKEN,
	perspective: 'published',
};

const serializers = {
	types: {
		mainImage: ({ node }) =>
			`![${node.alt || ''}](${PortableText.getImageUrl({
				options: config,
				node,
			})})`,
		image: ({ node }) =>
			`![${node.alt || ''}](${PortableText.getImageUrl({
				options: config,
				node,
			})})`,
		youtube: ({ node }) =>
			`<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYTid(
				node.url,
			)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
	},
	marks: {
		link: ({ mark, children }) => {
			// Read https://css-tricks.com/use-target_blank/
			const { blank, href } = mark;
			return blank
				? `<a href=${href} target="_blank" rel="noopener">${children}</a>`
				: `[${children}](${href})`;
		},
	},
};

const BlogSchemaWithContent = BlogSchema.extend({
	slug: z.string(),
	content: z.string(),
});

export const client = createClient(config);

// const oldCategories = {
// 	fiction: 'Fiction & Poetry',
// 	mind: 'Mind & Body',
// 	nature: 'Nature & Climate Change',
// 	mind: 'Better Humans',
// 	design: 'Design & Research',
// 	design: 'Business Basics',
// 	mind: 'Confidence',
// 	mind: 'Uncomfortable Things',
// };

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
	const docs = await client.fetch(`
    *[_type == "post" && defined(publishedAt)] {
      ...,
      "categories": categories[]->title,
      "slug": slug.current,
      "authors": authors[]->,
      "image": mainImage {
        alt,
        "src": asset->url,
        caption,
      }
    }
  `);

	const posts = docs.map((doc) => {
		const topics =
			doc.categories?.map((cat) => {
				if (
					[
						'Mind & Body',
						'Better Humans',
						'Confidence',
						'Uncomfortable Things',
					].includes(cat)
				) {
					return 'mind';
				}

				if (['Fiction & Poetry'].includes(cat)) {
					return 'fiction';
				}

				if (['Nature & Climate Change'].includes(cat)) {
					return 'nature';
				}
				if (['Design & Research', 'Business Basics'].includes(cat)) {
					return 'design';
				}
			}) ?? [];

		try {
			const post = BlogSchemaWithContent.parse({
				slug: doc.slug,
				title: doc.title,
				publishedAt: new Date(doc.publishedAt ?? new Date()),
				type: 'writing',
				topics,
				image: doc.image?.src ? doc.image : undefined,
				description: doc.description ?? '',
				content: doc.body
					? PortableText(doc.body, { serializers, ...config })
					: doc.markdown,
			});

			return post;
		} catch (err) {
			console.log(`error with ${doc.slug}`);
			console.error(err.message);

			return false;
		}
	});

	return posts.filter(Boolean);
}

export const GET = async () => {
	const posts = await getPosts();

	posts.forEach((post: z.infer<typeof BlogSchemaWithContent>) => {
		writeFileSync(
			resolve(
				`./src/content/blog/${post.publishedAt
					.toISOString()
					.split('T')
					.at(0)}-${post.slug}.md`,
			),
			`---
publishedAt: ${post.publishedAt.toISOString()}

slug: ${post.slug}
title: >
  ${post.title}
description: >
  ${post.description}

type: writing
topics:
${post.topics.map((t) => `- ${t}`).join('\n')}
${
	post.image && post.image.src
		? `image:
  ${post.image?.src ? `src: ${post.image.src}` : ''}
  ${post.image?.alt ? `alt: ${post.image.alt}` : ''}
  ${post.image?.caption ? `caption: ${post.image.caption}` : ''}
  `
		: ''
}
---

${post.content}`,
			'utf-8',
		);
	});

	return Response.json(posts.at(0));
};

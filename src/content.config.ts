import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const types: readonly [string, ...string[]] = [
	'art',
	'writing',
	'talks',
	'podcasts',
	'acting',
];
export const topics: readonly [string, ...string[]] = [
	'nature',
	'design',
	'research',
	'mind',
	'fiction',
];

export const BlogSchema = z.object({
	draft: z.boolean().optional().default(true),
	title: z.string(),
	publishedAt: z.date(),
	type: z.enum(types),
	topics: z.array(z.enum(topics)),
	image: z
		.object({
			src: z.string().url(),
			alt: z.string().nullable().optional(),
			caption: z.string().nullable().optional(),
		})
		.optional(),
	description: z.string().optional(),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: BlogSchema,
});

export const collections = { blog };

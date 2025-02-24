// @ts-check
import { defineConfig } from 'astro/config';
import { imageService } from '@unpic/astro/service';

// https://astro.build/config
export default defineConfig({
	image: {
		service: imageService({
			placeholder: 'blurhash',
		}),
	},
});

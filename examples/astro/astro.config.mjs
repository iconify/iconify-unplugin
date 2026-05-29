import { defineConfig } from 'astro/config';
import Icons from '@iconify/unplugin/vite';

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: 'never',
	},
	vite: {
		plugins: [
			Icons({
				compiler: 'astro',
			}),
			Icons({
				compiler: 'raw',
				namespace: 'iconify-raw',
			}),
		],
	},
});

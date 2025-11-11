import type { Options } from './types.js';
import unplugin from './index.js';

export default (options: Options): any => ({
	name: 'unplugin-starter',
	hooks: {
		'astro:config:setup': async (astro: any) => {
			astro.config.vite.plugins ||= [];
			astro.config.vite.plugins.push(unplugin.vite(options));
		},
	},
});

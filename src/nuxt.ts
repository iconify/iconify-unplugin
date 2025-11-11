import type { Options } from './types.js';
import unplugin from './index.js';

export default function (this: any, options: Options = {}, nuxt: any) {
	const nuxtApp = this?.nuxt || nuxt;

	options.compiler = 'vue';

	// injecting types
	nuxtApp.options.typescript ||= {};
	nuxtApp.options.typescript.tsConfig ||= {};
	nuxtApp.options.typescript.tsConfig.compilerOptions ||= {};
	nuxtApp.options.typescript.tsConfig.compilerOptions.types ||= [];
	nuxtApp.options.typescript.tsConfig.compilerOptions.types.push(
		'@iconify/unplugin/types/vue'
	);

	// install webpack plugin
	nuxtApp.hook('webpack:config', (configs: any[]) => {
		configs.forEach((config) => {
			config.plugins = config.plugins || [];
			config.plugins.unshift(unplugin.webpack(options));
		});
	});

	// install vite plugin
	nuxtApp.hook('vite:extend', async (vite: any) => {
		vite.config.plugins = vite.config.plugins || [];
		vite.config.plugins.push(unplugin.vite(options));
	});
}

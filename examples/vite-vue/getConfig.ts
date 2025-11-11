import { loadConfig, loadVitePluginConfig } from 'unconfig';

loadConfig({
	sources: [
		loadVitePluginConfig({
			pluginNames: ['@iconify/unplugin'],
		}),
	],
})
	// eslint-disable-next-line no-console
	.then((i) => console.log(i));

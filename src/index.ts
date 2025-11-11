import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import type { PluginOptions } from './plugin/types/options.js';
import { getCompilerDefaultExtension } from './plugin/url/ext.js';
import { testPluginPath } from './plugin/url/test.js';
import { mergeURL } from './plugin/url/split.js';
import { initCacheDir } from './plugin/cache/config.js';
import { readFromCache } from './plugin/cache/read.js';

export const unpluginFactory: UnpluginFactory<PluginOptions | undefined> = (
	options
) => {
	// Get namespace for this instance of plugin
	const namespace = options?.namespace || 'iconify';

	return {
		name: 'unplugin-iconify',
		enforce: 'pre',
		resolveId(id) {
			const cleanPath = testPluginPath(id, namespace, options?.compiler);
			if (cleanPath) {
				return mergeURL(cleanPath);
			}
			return null;
		},
		loadInclude(id) {
			const cleanPath = testPluginPath(id, namespace, options?.compiler);
			return !!cleanPath;
		},
		async load(id) {
			const cleanPath = testPluginPath(id, namespace, options?.compiler);
			if (cleanPath) {
				// Init stuff
				if (!(await initCacheDir(options?.cacheDir))) {
					throw new Error(
						'Failed to initialize cache directory, try setting custom one with "cacheDir" option'
					);
				}

				// Try to get file from cache
				const cached = await readFromCache(cleanPath);
				if (cached) {
					return {
						code: cached,
						map: { version: 3, mappings: '', sources: [] } as any,
					};
				}

				console.log('generating:', cleanPath);
				//
			}
		},
		rollup: {
			api: {
				config: options,
			},
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;

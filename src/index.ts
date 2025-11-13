import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import type { PluginOptions } from './plugin/types/options.js';
import { getCompilerDefaultExtension } from './plugin/url/ext.js';
import { testPluginPath } from './plugin/url/test.js';
import { mergeURL } from './plugin/url/split.js';
import { initCacheDir } from './plugin/cache/config.js';
import { readFromCache } from './plugin/cache/read.js';
import { cleanUpOptions } from './plugin/helpers/options.js';

export const unpluginFactory: UnpluginFactory<PluginOptions | undefined> = (
	options
) => {
	// Clean up options
	const fullOptions = cleanUpOptions(options || {});
	const namespace = fullOptions.namespace;

	return {
		name: 'unplugin-iconify',
		enforce: 'pre',
		resolveId(id) {
			const cleanPath = testPluginPath(id, fullOptions);
			if (cleanPath) {
				return mergeURL(cleanPath);
			}
			return null;
		},
		loadInclude(id) {
			const cleanPath = testPluginPath(id, fullOptions);
			return !!cleanPath;
		},
		async load(id) {
			const cleanPath = testPluginPath(id, fullOptions);
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

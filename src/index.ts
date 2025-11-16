import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import type { PluginOptions } from './plugin/types/options.js';
import { testPluginPath } from './plugin/url/test.js';
import { mergeURL } from './plugin/url/split.js';
import { initCacheDir } from './plugin/cache/config.js';
import { readFromCache } from './plugin/cache/read.js';
import { cleanUpOptions } from './plugin/helpers/options.js';
import { isAsset } from './plugin/asset/check.js';
import { loadIcon } from './plugin/icon/load.js';
import { isIconAsset } from './plugin/icon/path.js';
import { getFallbackParam } from './plugin/url/params.js';
import { compileComponent } from './plugin/component/compile.js';
import { prepareComponentForRender } from './plugin/component/stringify.js';

export const unpluginFactory: UnpluginFactory<PluginOptions | undefined> = (
	options
) => {
	// Clean up options
	const fullOptions = cleanUpOptions(options || {});

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

				// Check for reserved name
				if (isAsset(cleanPath)) {
					// Cannot render: should have been cached when generating icon
					throw new Error(
						`Asset not found in cache: ${mergeURL(cleanPath)}`
					);
				}

				// Load icon
				const iconName = isIconAsset(cleanPath);
				if (!iconName) {
					throw new Error(
						`Invalid icon path: ${mergeURL(cleanPath)}`
					);
				}
				const icon = await loadIcon(iconName.prefix, iconName.name, {
					...fullOptions,
					fallback: getFallbackParam(cleanPath.query),
				});
				if (!icon) {
					throw new Error(`Icon not found: ${mergeURL(cleanPath)}`);
				}

				// Compile component
				// console.log('generating:', cleanPath, 'with', icon);
				const component = compileComponent(
					icon,
					cleanPath,
					fullOptions
				);
				if (!component) {
					throw new Error(
						`Failed to compile component: ${mergeURL(cleanPath)}`
					);
				}

				// Return content
				const content = await prepareComponentForRender(
					component,
					fullOptions.namespace
				);
				return {
					code: content,
					map: { version: 3, mappings: '', sources: [] } as any,
				};
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

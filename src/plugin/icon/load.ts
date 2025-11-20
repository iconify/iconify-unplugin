import { getIconifyIconSetIcon } from '@cyberalien/svg-utils/lib/iconify/icon-set/icon.js';
import { loadIconSet } from '../icon-sets/load.js';
import type { LoadedIconData } from '../types/icon.js';
import { loadIconFromAPI } from './api.js';
import { convertIconifyIcon } from './convert.js';
import type { PluginOptions } from '../types/options.js';
import type { ConvertSVGContentOptions } from '@cyberalien/svg-utils/lib/svg-css/types.js';
import { defaultCSSHashOptions } from './svg-css/config.js';
import type { IconMode } from '../types/mode.js';
import type { IconifyIcon } from '@iconify/types';

interface Options extends Pick<PluginOptions, 'allowAPI' | 'cssHash'> {
	// Custom fallback icon name, in format 'prefix:name'
	fallback?: string;

	// Rendering mode
	mode: IconMode;
}

/**
 * Load icon
 *
 * @param prefix Icon prefix
 * @param name Icon name
 * @param fallback Optional fallback icon name
 * @returns Loaded icon data or null if not found
 */
export async function loadIcon(
	prefix: string,
	name: string,
	options: Options
): Promise<LoadedIconData | null> {
	const iconSet = await loadIconSet(prefix, options?.allowAPI);
	if (!iconSet) {
		return null;
	}

	// Options for conversion
	const convertOptions: ConvertSVGContentOptions = {
		hashOptions: {
			...defaultCSSHashOptions,
			...options.cssHash,
		},
	};

	// Get fallback icon name
	const fallback =
		options?.fallback ??
		(iconSet.isIconify ? `${prefix}:${name}` : undefined);

	if (iconSet.data) {
		// Get icon from IconifyJSON format
		const data = getIconifyIconSetIcon(iconSet.data, name);
		if (data) {
			return convertIconifyIcon(data, {
				icon: {
					name,
					prefix,
					fallback,
					isIconify: iconSet.isIconify,
				},
				options: convertOptions,
				mode: options.mode,
			});
		}
	}

	if (iconSet.isIconify && iconSet.api) {
		// Fetch icon from API
		const data = await loadIconFromAPI(iconSet, iconSet.api, name);
		if (data) {
			return convertIconifyIcon(data, {
				icon: {
					name,
					prefix,
					fallback,
					isIconify: true,
				},
				options: convertOptions,
				mode: options.mode,
			});
		}
	}

	// Failed to load icon set
	return null;
}

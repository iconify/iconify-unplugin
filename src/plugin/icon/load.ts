import { getIconifyIconSetIcon } from '@cyberalien/svg-utils/lib/iconify/icon-set/icon.js';
import { prepareComponentFactoryStatefulIcon } from '@cyberalien/svg-utils/lib/components/prepare/states.js';
import { loadIconSet } from '../icon-sets/load.js';
import type { LoadedIconData } from '../types/icon.js';
import { loadIconFromAPI } from './api.js';
import { convertIconifyIcon } from './convert.js';
import type { PluginOptions } from '../types/options.js';
import type { ConvertSVGContentOptions } from '@cyberalien/svg-utils/lib/svg-css/types.js';
import { defaultCSSHashOptions } from '../helpers/config.js';
import type { IconMode } from '../types/mode.js';
import { getSVGCSSIconFromIconSet } from '@cyberalien/svg-utils';

interface Options extends Pick<PluginOptions, 'allowAPI' | 'cssHash'> {
	// Custom fallback icon name, in format 'prefix:name'
	fallback?: string;

	// Rendering mode
	mode: IconMode;
}

// Do not load the following icon sets from API
const skipAPIForPrefixes = ['line-md'];

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

	// Check for CSS icon
	if (options.mode !== 'svg' && iconSet.cssData) {
		const cssIcon = getSVGCSSIconFromIconSet(iconSet.cssData, name);
		const icon = cssIcon
			? prepareComponentFactoryStatefulIcon(cssIcon)
			: null;
		if (icon) {
			return {
				prefix,
				name,
				icon,
				useFallback: iconSet.useFallback,
			};
		}
	}

	// Options for conversion
	const convertOptions: ConvertSVGContentOptions = {
		...defaultCSSHashOptions,
		...options.cssHash,
	};

	// Get fallback icon name
	const fallback =
		options?.fallback ??
		(iconSet.useFallback ? `${prefix}:${name}` : undefined);

	if (iconSet.iconifyData) {
		// Get icon from IconifyJSON format
		const data = getIconifyIconSetIcon(iconSet.iconifyData, name);
		if (data) {
			return convertIconifyIcon(data, {
				name,
				prefix,
				useFallback: iconSet.useFallback,
				options: convertOptions,
				mode: options.mode,
			});
		}
	}

	if (
		iconSet.useFallback &&
		iconSet.lastUpdate &&
		!skipAPIForPrefixes.includes(prefix)
	) {
		// Fetch icon from API
		const data = await loadIconFromAPI(iconSet, iconSet.lastUpdate, name);
		if (data) {
			return convertIconifyIcon(data, {
				name,
				prefix,
				fallback,
				useFallback: true,
				options: convertOptions,
				mode: options.mode,
			});
		}
	}

	// Failed to load icon set
	return null;
}

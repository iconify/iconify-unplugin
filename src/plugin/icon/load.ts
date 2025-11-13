import type { IconifyIcon } from '@iconify/types';
import { getIconifyIconSetIcon } from '@cyberalien/svg-utils/lib/iconify/icon-set/icon.js';
import { loadIconSet } from '../icon-sets/load.js';
import type { LoadedIconData } from '../types/icon.js';
import { loadIconFromAPI } from './api.js';

interface Options {
	// Custom fallback icon name, in format 'prefix:name'
	fallback?: string;

	// Use Iconify API to load icon set
	allowAPI?: boolean;
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
	options?: Options
): Promise<LoadedIconData | null> {
	const iconSet = await loadIconSet(prefix, options?.allowAPI);
	if (!iconSet) {
		return null;
	}

	// Get fallback icon name
	const fallback =
		options?.fallback ??
		(iconSet.isIconify ? `${prefix}:${name}` : undefined);

	if (iconSet.data) {
		// Get icon from IconifyJSON format
		const data = getIconifyIconSetIcon(iconSet.data, name);
		if (data) {
			return {
				prefix,
				name,
				isIconify: iconSet.isIconify,
				data,
				fallback,
			};
		}
	}

	if (iconSet.isIconify && iconSet.api) {
		// Fetch icon from API
		const data = await loadIconFromAPI(iconSet, iconSet.api, name);
		if (data) {
			return {
				prefix,
				name,
				isIconify: true,
				data,
				fallback,
			};
		}
	}

	// Failed to load icon set
	return null;
}

import type { IconifyIcon } from '@iconify/types';
import { getIconifyIconSetIcon } from '@cyberalien/svg-utils/lib/iconify/icon-set/icon.js';
import { loadIconSet } from '../icon-sets/load.js';

/**
 * Load icon
 */
export async function loadIcon(
	prefix: string,
	name: string
): Promise<IconifyIcon | null> {
	const iconSet = await loadIconSet(prefix);
	if (!iconSet) {
		return null;
	}

	const data = getIconifyIconSetIcon(iconSet.data, name);
	return data ?? null;
}

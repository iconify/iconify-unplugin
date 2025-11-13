import { readFile } from 'node:fs/promises';
import type { IconifyJSON } from '@iconify/types';
import { getPackageRootPath } from './package.js';
import type { IconSetData } from '../types/icon-set.js';
import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import { fetchIconifyIconSetsFromAPI } from './api.js';

// Cache for loaded icon sets
const cache: Record<string, IconSetData | null> = {};

/**
 * Load icon set
 */
async function load(
	prefix: string,
	allowAPI?: boolean
): Promise<IconSetData | null> {
	// Try '@iconify/json' package
	const fullPackage = await getPackageRootPath('@iconify/json');
	if (fullPackage) {
		// Load icon set
		try {
			const data = await readFile(
				`${fullPackage}/icon-sets/${prefix}.json`,
				'utf8'
			);
			return {
				prefix,
				data: JSON.parse(data) as IconifyJSON,
				isIconify: true,
			};
		} catch {
			//
		}
	}

	// Try '@iconify-json/{prefix}' package
	const packageName = `@iconify-json/${prefix}`;
	const packageRoot = await getPackageRootPath(packageName);
	if (packageRoot) {
		// Load icon set
		try {
			const data = await readFile(`${packageRoot}/icons.json`, 'utf8');
			return {
				prefix,
				data: JSON.parse(data) as IconifyJSON,
				isIconify: true,
			};
		} catch {
			//
		}
	}

	// Get icon sets from Iconify API
	if (allowAPI !== false) {
		const apiIconSets = await fetchIconifyIconSetsFromAPI();
		if (apiIconSets?.[prefix]) {
			return {
				prefix,
				api: apiIconSets[prefix],
				isIconify: true,
			};
		}
	}

	return null;
}

/**
 * Load icon set by prefix
 */
export async function loadIconSet(
	prefix: string,
	allowAPI?: boolean
): Promise<IconSetData | null> {
	// Check cache
	if (prefix in cache) {
		return cache[prefix];
	}

	// Load icon set
	const data = await uniquePromise(`icon-set-load-${prefix}`, () =>
		load(prefix, allowAPI)
	);

	// Store in cache
	cache[prefix] = data;

	return data;
}

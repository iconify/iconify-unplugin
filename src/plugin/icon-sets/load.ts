import { readFile } from 'node:fs/promises';
import type { IconifyJSON } from '@iconify/types';
import { getPackageRootPath } from './package.js';
import type { IconSetData } from '../types/icon-set.js';
import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import { fetchIconifyIconSetsFromAPI } from './api.js';
import type { SVGCSSIconSet } from '@cyberalien/svg-utils';

// Cache for loaded icon sets
const cache: Record<string, IconSetData | null> = {};

/**
 * Load file if possible
 */
async function tryLoadJSON<T>(filename: string): Promise<T | undefined> {
	try {
		return JSON.parse(await readFile(filename, 'utf8')) as T;
	} catch {
		//
	}
}

/**
 * Load icon set
 */
async function load(
	prefix: string,
	allowAPI?: boolean
): Promise<IconSetData | null> {
	if (!prefix.match(/^[a-z0-9-_]+$/)) {
		// Invalid prefix
		return null;
	}

	// Try '@iconify/json' package
	const fullPackage = await getPackageRootPath('@iconify/json');
	if (fullPackage) {
		// Load icon set
		try {
			const iconifyData: IconifyJSON = JSON.parse(
				await readFile(`${fullPackage}/json/${prefix}.json`, 'utf8')
			);
			const cssData = await tryLoadJSON<SVGCSSIconSet>(
				`${fullPackage}/css/${prefix}.json`
			);

			return {
				prefix,
				iconifyData,
				cssData,
				useFallback: true,
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
			const iconifyData: IconifyJSON = JSON.parse(
				await readFile(`${packageRoot}/icons.json`, 'utf8')
			);
			const cssData = await tryLoadJSON<SVGCSSIconSet>(
				`${packageRoot}/css.json`
			);
			return {
				prefix,
				iconifyData,
				cssData,
				useFallback: true,
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
				lastUpdate: apiIconSets[prefix],
				useFallback: true,
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

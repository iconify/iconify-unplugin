import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import type { APIIconSetsLastModified } from '../types/icon-set.js';
import { readFromCache } from '../cache/read.js';
import { writeToCache } from '../cache/write.js';
import { getCacheFilename } from '../cache/filename.js';

// Refresh cache every 4 days
const time = Math.floor(Date.now() / 1000 / 3600 / 24 / 4);

// Cache
let cachedData: APIIconSetsLastModified | null | undefined = undefined;

/**
 * Load icon sets from Iconify API
 */
async function loadFromAPI(): Promise<APIIconSetsLastModified | null> {
	try {
		const response = await fetch(
			`https://api.iconify.design/last-modified?cache=${time}`
		);
		const data = await response.json();
		if ('lastModified' in data) {
			return data.lastModified as APIIconSetsLastModified;
		}
	} catch {
		//
	}
	return null;
}

/**
 * Load icon sets
 */
async function load(): Promise<APIIconSetsLastModified | null> {
	const cacheURL = `_api/icon-sets.${time}.json`;
	if (!getCacheFilename(cacheURL)) {
		// Do not read API if caching is disabled
		return null;
	}

	// Try to load from cache
	const cached = await readFromCache(cacheURL);
	if (cached) {
		cachedData =
			cached === 'null'
				? null
				: (JSON.parse(cached) as APIIconSetsLastModified);
		return cachedData;
	}

	// Load from API
	const apiData = await loadFromAPI();

	// Save to cache
	await writeToCache(
		cacheURL,
		apiData === null ? 'null' : JSON.stringify(apiData)
	);

	// Return
	cachedData = apiData;
	return cachedData;
}

/**
 * Fetch icon sets from Iconify API
 */
export async function fetchIconifyIconSetsFromAPI(): Promise<APIIconSetsLastModified | null> {
	if (cachedData !== undefined) {
		return cachedData;
	}
	return uniquePromise(`iconify-api-icon-sets`, () => load());
}

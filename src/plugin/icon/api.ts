import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import type { IconSetData } from '../types/icon-set.js';
import type { APIv2CollectionResponse } from '../types/api.js';
import { readFromCache } from '../cache/read.js';
import { writeToCache } from '../cache/write.js';
import type { IconifyIcon, IconifyJSON } from '@iconify/types';
import { getIconifyIconSetIcon } from '@cyberalien/svg-utils/lib/iconify/icon-set/icon.js';

// List of items that failed to load from API
const failedItems = new Set<string>();

// Cache of icon names for icon sets
const cachedNames = Object.create(null) as Record<string, Set<string>>;

// Cache of icon data
const cachedIcons = Object.create(null) as Record<string, IconifyIcon>;

/**
 * Load icon names for icon set
 */
async function loadIconNames(
	prefix: string,
	lastModified: number
): Promise<Set<string> | null> {
	const cacheURL = `_api/icons.${prefix}.${lastModified}.json`;

	// Try to load from cache
	const cachedData = await readFromCache(cacheURL);
	if (cachedData) {
		return new Set(JSON.parse(cachedData) as string[]);
	}

	// Get raw data
	let data: APIv2CollectionResponse | null = null;
	try {
		const response = await fetch(
			`https://api.iconify.design/collection?prefix=${prefix}&cache=${lastModified}`
		);
		data = (await response.json()) as APIv2CollectionResponse;
	} catch {
		//
	}
	if (!data) {
		failedItems.add(prefix);
		return null;
	}

	// Extract icon names
	const iconNames = new Set([
		...(data.uncategorized ?? []),
		...(data.hidden ?? []),
		...Object.keys(data.aliases ?? {}),
	]);
	if (data.categories) {
		for (const category in data.categories) {
			const names = data.categories[category];
			for (const name of names) {
				iconNames.add(name);
			}
		}
	}

	// Cache it
	await writeToCache(cacheURL, JSON.stringify(Array.from(iconNames)));

	// Return
	return iconNames;
}

/**
 * Load icon
 */
async function loadIcon(
	prefix: string,
	name: string,
	lastModified: number
): Promise<IconifyIcon | null> {
	const fullName = `${prefix}:${name}`;
	if (!fullName.match(/^[a-z0-9-_]+:[a-z0-9-_]+$/)) {
		// Invalid prefix or name
		return null;
	}

	const cacheURL = `_api/${prefix}/${name}.${lastModified}.json`;

	// Try to load from cache
	const cachedData = await readFromCache(cacheURL);
	if (cachedData) {
		return JSON.parse(cachedData) as IconifyIcon;
	}

	// Make sure it wasn't marked as failed
	if (failedItems.has(fullName)) {
		return null;
	}

	// Fetch from API
	let iconSetData: IconifyJSON | null = null;
	try {
		const response = await fetch(
			`https://api.iconify.design/${prefix}.json?icons=${name}&cache=${lastModified}`
		);
		iconSetData = (await response.json()) as IconifyJSON;
	} catch {
		//
	}
	if (!iconSetData) {
		failedItems.add(prefix);
		return null;
	}

	const data = getIconifyIconSetIcon(iconSetData, name);
	if (data) {
		// Cache it
		await writeToCache(cacheURL, JSON.stringify(data));
		cachedIcons[fullName] = data;
		return data;
	}

	// Mark as failed
	failedItems.add(fullName);
	return null;
}

/**
 * Load icon from Iconify API
 */
export async function loadIconFromAPI(
	iconSet: IconSetData,
	lastModified: number,
	name: string
): Promise<IconifyIcon | null> {
	const { prefix } = iconSet;
	if (failedItems.has(prefix)) {
		return null;
	}

	// Get list of available icons
	const iconNames =
		cachedNames[prefix] ||
		(await uniquePromise(`load-icon-names:${prefix}:${lastModified}`, () =>
			loadIconNames(prefix, lastModified)
		));
	if (!iconNames?.has(name)) {
		return null;
	}

	// Load icon
	const iconData =
		cachedIcons[`${prefix}:${name}`] ||
		(await uniquePromise(
			`load-icon:${prefix}:${name}:${lastModified}`,
			() => loadIcon(prefix, name, lastModified)
		));
	return iconData ?? null;
}

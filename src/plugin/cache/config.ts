import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import { lstat, mkdir } from 'node:fs/promises';

let cacheDir: string | null | undefined = undefined;

/**
 * Get cache directory
 */
export function getCacheDir(): string | null | undefined {
	return cacheDir;
}

/**
 * Try to create directory
 */
async function tryCreateDir(dir: string): Promise<boolean> {
	try {
		await mkdir(dir, { recursive: true });
	} catch {
		//
	}
	try {
		const stats = await lstat(dir);
		return stats.isDirectory();
	} catch {
		//
	}
	return false;
}

/**
 * Initialize cache directory
 */
async function init(dir?: string): Promise<void> {
	// Check provided directory
	if (dir) {
		cacheDir = (await tryCreateDir(dir)) ? dir : null;
		return;
	}

	// Try to find nearest node_modules directory
	const dirs = [
		'./node_modules',
		'../node_modules',
		'../../node_modules',
		'../../../node_modules',
	];
	for (const dir of dirs) {
		try {
			const stats = await lstat(dir);
			if (stats.isDirectory()) {
				const testDir = dir + '/.unplugin-iconify';
				if (await tryCreateDir(testDir)) {
					cacheDir = testDir;
					return;
				}
			}
		} catch {
			// Ignore
		}
	}

	// Failed
	cacheDir = null;
}

let initialized: string | undefined | null = null;

/**
 * Initialize cache directory
 */
export async function initCacheDir(
	dir?: string
): Promise<string | null | undefined> {
	// Make sure only one directory is used
	if (initialized !== null && initialized !== dir) {
		throw new Error(
			'Please use the same cache directory for all plugin instances'
		);
	}
	initialized = dir;

	// Initialize cache directory
	if (cacheDir === undefined) {
		await uniquePromise('init-cache-dir', () => init(dir));
	}
	return cacheDir;
}

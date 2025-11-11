import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import { lstat, mkdir } from 'node:fs/promises';

let cacheDir: string | null | undefined = undefined;

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
async function init(dir?: string) {
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
					console.log('Cache directory initialized:', cacheDir);
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

/**
 * Initialize cache directory
 */
export async function initCacheDir(
	dir?: string
): Promise<string | null | undefined> {
	if (cacheDir === undefined) {
		await uniquePromise('init-cache-dir', () => init());
	}
	return cacheDir;
}

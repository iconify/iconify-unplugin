import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';
import { rm, lstat, mkdir, writeFile, readFile } from 'node:fs/promises';

// Cache directory: null if failed, undefined if not initialized yet
let cacheDir: string | null | undefined = undefined;

// Last initialized directory to avoid conflicts
let initialized: string | undefined | null = null;

// Default error message
const defaultErrorMessage =
	'Cache directory is not available, please set "cacheDir" option.';

/**
 * Get cache directory
 */
export function getCacheDir(): string {
	if (!cacheDir) {
		throw new Error(defaultErrorMessage);
	}
	return cacheDir ?? undefined;
}

/**
 * Try to create directory
 */
async function tryCreateDir(dir: string): Promise<boolean> {
	// Create directory
	try {
		await mkdir(dir, { recursive: true });
	} catch {
		//
	}

	// Make sure it's a directory
	try {
		const stats = await lstat(dir);
		return stats.isDirectory();
	} catch {
		//
	}

	return false;
}

/**
 * Create test file in directory
 */
async function tryCreateTestFile(dir: string): Promise<boolean> {
	const time = Date.now();
	const filename = `${dir}/test.${time}.json`;

	// Create file
	try {
		await writeFile(filename, JSON.stringify({ time }));
	} catch {
		return false;
	}

	// Read file
	let success = false;
	try {
		const data = JSON.parse(await readFile(filename, 'utf-8'));
		if (data.time === time) {
			success = true;
		}
	} catch {
		//
	}

	// Delete file
	try {
		await rm(filename);
	} catch {
		//
	}

	return success;
}

/**
 * Initialize cache directory
 */
async function init(dir?: string): Promise<void> {
	// Check provided directory
	if (dir) {
		if (dir.endsWith('/')) {
			dir = dir.slice(0, -1);
		}
		if (!(await tryCreateDir(dir)) || !(await tryCreateTestFile(dir))) {
			throw new Error(`Cannot use provided cache directory: ${dir}`);
		}
		cacheDir = dir;
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
				if (
					(await tryCreateDir(testDir)) &&
					(await tryCreateTestFile(testDir))
				) {
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

/**
 * Initialize cache directory
 */
export async function initCacheDir(dir?: string): Promise<string> {
	// Make sure only one directory is used in all instances
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
	if (!cacheDir) {
		throw new Error(defaultErrorMessage);
	}
	return cacheDir;
}

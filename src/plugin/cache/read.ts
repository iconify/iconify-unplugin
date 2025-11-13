import { readFile } from 'node:fs/promises';
import type { SplitURL } from '../types/urls.js';
import { getCacheFilename } from './filename.js';

/**
 * Read file from cache
 */
export async function readFromCache(
	url: SplitURL | string
): Promise<string | undefined> {
	const filename = getCacheFilename(url);
	if (filename) {
		try {
			return await readFile(filename, 'utf-8');
		} catch {
			//
		}
	}
}

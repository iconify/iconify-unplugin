import { readFile } from 'node:fs/promises';
import type { SplitURL } from '../types/urls.js';
import { urlToCacheFilename } from './filename.js';

/**
 * Read file from cache
 */
export async function readFromCache(
	url: SplitURL
): Promise<string | undefined> {
	const filename = urlToCacheFilename(url);
	if (filename) {
		try {
			return await readFile(filename, 'utf-8');
		} catch {
			//
		}
	}
}

import { writeFile, mkdir } from 'node:fs/promises';
import type { SplitURL } from '../types/urls.js';
import { urlToCacheFilename } from './filename.js';

/**
 * Read file from cache
 */
export async function writeToCache(
	url: SplitURL,
	content: string
): Promise<boolean> {
	const filename = urlToCacheFilename(url);
	if (filename) {
		// Ensure directory exists
		const dirname = filename.substring(0, filename.lastIndexOf('/'));
		try {
			await mkdir(dirname, {
				recursive: true,
			});
		} catch {
			//
		}

		// Write file
		try {
			await writeFile(filename, content, 'utf-8');
			return true;
		} catch {
			//
		}
	}

	return false;
}

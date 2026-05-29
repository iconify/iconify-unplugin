import type { SplitURL } from '../types/urls.js';
import { getCacheDir } from './config.js';

// Ignore keys in query
const skipKeys = ['inline'];

/**
 * Get cache filename from URL or string
 */
export function getCacheFilename(url: SplitURL | string): string | undefined {
	// Get cache directory
	const cacheDir = getCacheDir();

	// Handle string URL
	if (typeof url === 'string') {
		return `${cacheDir}/_data/${url}`;
	}

	// Split URL, can be used only with empty query
	const { namespace, directory, filename, extension, query } = url;
	for (const key of query) {
		if (!skipKeys.includes(key[0])) {
			return;
		}
	}
	const parts: string[] = [
		cacheDir,
		namespace,
		directory,
		filename.slice(0, 1),
		extension ? `${filename}.${extension}` : filename,
	];
	return parts.join('/');
}

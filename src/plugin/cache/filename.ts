import type { SplitURL } from '../types/urls.js';

/**
 * Get cache filename from URL
 */
export function urlToCacheFilename(url: SplitURL): string | undefined {
	const { namespace, directory, filename, extension, query } = url;

	// Make sure query is empty
	for (const key in query) {
		return;
	}

	const parts: string[] = [
		namespace,
		directory,
		filename.slice(0, 1),
		extension ? `${filename}.${extension}` : filename,
	];
	return parts.join('/');
}

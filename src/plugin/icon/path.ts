import type { SplitURL } from '../types/urls.js';

interface Result {
	prefix: string;
	name: string;
}

/**
 * Check if URL is an icon asset
 */
export function isIconAsset(url: SplitURL): Result | undefined {
	const { directory, filename } = url;
	if (
		// Reserved directory
		directory.startsWith('_') ||
		// Should not have slashes or dots
		directory.includes('/') ||
		filename.includes('/') ||
		directory.includes('.') ||
		filename.includes('.')
	) {
		return;
	}
	return {
		prefix: directory,
		name: filename,
	};
}

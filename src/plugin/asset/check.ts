import type { SplitURL } from '../types/urls.js';
import {
	cssDirectory,
	helpersDirectory,
	viewboxDirectory,
} from '../url/const.js';

/**
 * Check if URL is an asset
 */
export function isAsset(url: SplitURL): string | null {
	// Should not have a query
	for (const item of url.query.entries()) {
		return null;
	}

	// Check directory
	switch (url.directory) {
		case cssDirectory:
		case helpersDirectory:
		case viewboxDirectory:
			return url.directory;
	}
	return null;
}

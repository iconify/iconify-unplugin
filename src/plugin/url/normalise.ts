import { isAsset } from '../asset/check.js';
import type { ComponentCompiler } from '../types/compiler.js';
import type { SplitURL } from '../types/urls.js';
import { cssDirectory, helpersDirectory, viewboxDirectory } from './const.js';
import {
	getCompilerDefaultExtension,
	getCompilerFromExtension,
} from './ext.js';

/**
 * Normalise URL
 */
export function normaliseURL(
	url: SplitURL,
	defaultCompiler?: ComponentCompiler
): boolean {
	const { query } = url;

	// Check reserved directories
	const reservedDirectory = isAsset(url);
	if (reservedDirectory) {
		switch (reservedDirectory) {
			case cssDirectory:
				return url.extension === 'css';

			default:
				switch (url.extension) {
					case 'js':
					case 'ts':
						return true;
				}
				return false;
		}
	}

	// Check for compiler from options, set/override extension if needed
	const compiler = query.get('compiler');
	if (typeof compiler === 'string') {
		const ext = getCompilerDefaultExtension(
			compiler as ComponentCompiler,
			url.extension
		);
		url.extension = ext;
		return true;
	}

	// Attempt to get compiler based on extension
	if (url.extension) {
		const compiler = getCompilerFromExtension(
			url.extension,
			defaultCompiler
		);
		if (compiler) {
			// Compiler found, set in query and override extension
			url.query.set('compiler', compiler);
			url.extension = getCompilerDefaultExtension(
				compiler,
				url.extension
			);
			return true;
		}
	}

	// Use default compiler if provided
	if (defaultCompiler) {
		url.query.set('compiler', defaultCompiler);
		url.extension = getCompilerDefaultExtension(
			defaultCompiler,
			url.extension
		);
		return true;
	}

	// Failed to normalise
	return false;
}

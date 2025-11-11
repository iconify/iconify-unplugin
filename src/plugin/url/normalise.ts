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
) {
	const { query, directory } = url;

	// Check reserved directories
	switch (directory) {
		case cssDirectory:
		case helpersDirectory:
		case viewboxDirectory: {
			// No compiler, query should be empty
			url.extension = directory === cssDirectory ? 'css' : 'js';
			url.query = new URLSearchParams();
			return;
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
		return;
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
			return;
		}
	}

	// Use default compiler if provided
	if (defaultCompiler) {
		url.query.set('compiler', defaultCompiler);
		url.extension = getCompilerDefaultExtension(
			defaultCompiler,
			url.extension
		);
	}
}

import type { ComponentCompiler } from '../types/compiler.js';
import type { NormalizedURL, SplitURL } from '../types/urls.js';
import { cssDirectory, helpersDirectory } from './const.js';
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
): NormalizedURL | undefined {
	// Clone URL
	const query = new URLSearchParams(url.query);
	const normalisedURL = {
		...url,
		query,
	};

	// Check reserved directories
	switch (normalisedURL.directory) {
		case cssDirectory:
			return normalisedURL.extension === 'css'
				? {
						...normalisedURL,
						type: 'asset',
				  }
				: undefined;

		case helpersDirectory:
			switch (normalisedURL.extension) {
				case 'js':
				case 'ts':
					return {
						...normalisedURL,
						type: 'asset',
					};
			}
			return;
	}

	// Check for types file
	if (normalisedURL.extension.startsWith('d.')) {
		return {
			...normalisedURL,
			type: 'asset',
		};
	}

	// Check for compiler from options, set/override extension if needed
	const compiler = query.get('compiler');
	if (typeof compiler === 'string') {
		const ext = getCompilerDefaultExtension(
			compiler as ComponentCompiler,
			normalisedURL.extension
		);
		normalisedURL.extension = ext;
		return {
			...normalisedURL,
			type: 'component',
		};
	}

	// Attempt to get compiler based on extension
	if (normalisedURL.extension) {
		const compiler = getCompilerFromExtension(
			normalisedURL.extension,
			defaultCompiler
		);
		if (compiler) {
			// Compiler found, set in query and override extension
			normalisedURL.query.set('compiler', compiler);
			normalisedURL.extension = getCompilerDefaultExtension(
				compiler,
				normalisedURL.extension
			);
			return {
				...normalisedURL,
				type: 'component',
			};
		}
	}

	// Use default compiler if provided
	if (defaultCompiler) {
		normalisedURL.query.set('compiler', defaultCompiler);
		normalisedURL.extension = getCompilerDefaultExtension(
			defaultCompiler,
			normalisedURL.extension
		);
		return {
			...normalisedURL,
			type: 'component',
		};
	}

	// Failed to normalise
}

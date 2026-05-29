import type { ComponentCompiler } from '../types/compiler.js';

/**
 * Get default extension for compiler
 */
export function getCompilerDefaultExtension(
	compiler: ComponentCompiler,
	defaultExtension?: string
): string {
	switch (compiler) {
		case 'svelte':
		case 'astro':
			return compiler;

		case 'react':
		case 'preact':
			if (defaultExtension === 'tsx') {
				return 'tsx';
			}
			return 'jsx';

		case 'vue':
			return 'js';

		case 'raw':
			if (defaultExtension === 'ts') {
				return 'ts';
			}
			return 'js';

		default:
			return '';
	}
}

/**
 * Get compiler from extension
 */
export function getCompilerFromExtension(
	extension: string,
	defaultCompiler?: ComponentCompiler
): ComponentCompiler | undefined {
	switch (extension) {
		// Extension that matches compiler
		case 'svelte':
		case 'vue':
			return extension;
	}

	return defaultCompiler || 'raw';
}

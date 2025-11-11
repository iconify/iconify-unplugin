import type { ComponentCompiler } from '../types/compiler.js';
import { normaliseURL } from './normalise.js';
import { mergeURL, splitURL } from './split.js';

/**
 * Test for path used by plugin, return normalised path if matched
 */
export function testPluginPath(
	path: string,
	namespace: string,
	defaultCompiler?: ComponentCompiler
) {
	const split = splitURL(path, namespace);
	if (split) {
		normaliseURL(split, defaultCompiler);
		return split;
	}
}

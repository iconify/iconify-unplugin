import type { CleanedPluginOptions } from '../types/options.js';
import { normaliseURL } from './normalise.js';
import { splitURL } from './split.js';

/**
 * Test for path used by plugin, return normalised path if matched
 */
export function testPluginPath(path: string, options: CleanedPluginOptions) {
	const split = splitURL(path, options.namespace);
	if (split) {
		return normaliseURL(split, options.compiler) ? split : undefined;
	}
}

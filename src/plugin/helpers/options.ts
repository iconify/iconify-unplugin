import { defaultCSSHashOptions } from '../icon/svg-css/config.js';
import type { CleanedPluginOptions, PluginOptions } from '../types/options.js';

/**
 * Clean up options, set defaults
 */
export function cleanUpOptions(options: PluginOptions): CleanedPluginOptions {
	return {
		namespace: options.namespace ?? 'iconify',
		cssHash: defaultCSSHashOptions,
		...options,
	};
}

import type { CSSHashOptions } from '@cyberalien/svg-utils/lib/css/types.js';
import type { ComponentCompiler } from './compiler.js';

export interface CleanedPluginOptions {
	/**
	 * Namespace for icon URLs
	 *
	 * Default: 'iconify'
	 */
	namespace: string;

	/**
	 * Compiler
	 *
	 * Default: 'raw'
	 *
	 * Can be overwritten for each icon by URL query parameter `compiler` or by file extension
	 */
	compiler?: ComponentCompiler;

	/**
	 * Cache directory for generated assets, relative to project root
	 *
	 * Default: '.unplugin-iconify' in nearest 'node_modules' directory
	 */
	cacheDir?: string;

	/**
	 * Options for CSS hash generation
	 */
	cssHash: Partial<CSSHashOptions>;

	/**
	 * Use Iconify API to load icon sets if not found locally
	 */
	allowAPI?: boolean;
}

export type PluginOptions = Partial<CleanedPluginOptions>;

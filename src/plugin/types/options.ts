import type { CSSHashOptions } from '@cyberalien/svg-utils/lib/css/types.js';
import type { ComponentCompiler } from './compiler.js';
import type { IconCSSMode, IconMode } from './mode.js';

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
	 * Icon rendering mode
	 *
	 * Default: 'svg+css'
	 */
	mode?: IconMode;

	/**
	 * CSS mode for 'svg+css' rendering mode
	 *
	 * Default: 'import'
	 */
	css?: IconCSSMode;

	/**
	 * Cache directory for generated assets, relative to project root
	 *
	 * Default: '.iconify-unplugin' in nearest 'node_modules' directory
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

import type { CSSExportMode } from '@cyberalien/svg-utils/lib/components/types/css.js';

/**
 * Icon rendering mode
 *
 * 'svg+css' - Split SVG and CSS (default)
 * 'svg'     - Inline full SVG
 */
export type IconMode = 'svg+css' | 'svg';

/**
 * CSS modes for 'svg+css' rendering mode
 */
export type IconCSSMode = Exclude<CSSExportMode, 'prop'>;

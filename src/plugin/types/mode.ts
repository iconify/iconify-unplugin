import type { CSSExportMode } from '@cyberalien/svg-utils/lib/components/types/css.js';

/**
 * Icon rendering mode
 *
 * 'svg+css' - Split SVG and CSS (default)
 * 'legacy'  - Split SVG and CSS, with legacy browsers support (Safari browser)
 * 'svg'     - Inline full SVG
 */
export type IconMode = 'svg+css' | 'legacy' | 'svg';

/**
 * CSS modes for 'svg+css' rendering mode
 */
export type IconCSSMode = Exclude<CSSExportMode, 'prop'>;

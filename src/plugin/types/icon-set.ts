import type { SVGCSSIconSet } from '@cyberalien/svg-utils';
import type { IconifyJSON } from '@iconify/types';

/**
 * Last modified time for icon sets.
 *
 * Key is icon set prefix, value is a number representing last update time or version
 */
export type APIIconSetsLastModified = Record<string, number>;

/**
 * Data in Iconify JSON format
 */
export interface IconSetData {
	// Icon set prefix
	prefix: string;

	// Full icon set data in Iconify JSON format (if available)
	iconifyData?: IconifyJSON;

	// Full icon set data in SVGCSSIconSet format (if available)
	cssData?: SVGCSSIconSet;

	// Last update data for loading from API
	lastUpdate?: number;

	// Use fallback for icon
	useFallback: boolean;
}

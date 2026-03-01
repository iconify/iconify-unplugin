import type { IconifyJSON } from '@iconify/types';

/**
 * Last modified time for icon sets.
 *
 * Key is icon set prefix, value is a number representing last update time or version
 */
export type APIIconSetsLastModified = Record<string, number>;

/**
 * Common data for all types of icon sets
 */
interface CommonData {
	// Icon set prefix
	prefix: string;
}

/**
 * Data in Iconify JSON format
 */
export interface IconifyJSONIconSetData extends CommonData {
	// Icon set type
	type: 'iconify';

	// Full icon set data
	data?: IconifyJSON;

	// Last update data for loading from API
	lastUpdate?: number;

	// Use fallback for icon
	useFallback: boolean;
}

/**
 * Combined data types
 */
export type IconSetData = IconifyJSONIconSetData;

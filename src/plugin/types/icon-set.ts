import type { IconifyJSON } from '@iconify/types';

export type APIIconSets = Record<string, number>;

export interface IconSetData {
	prefix: string;

	// Full icon set data
	data?: IconifyJSON;

	// Last update data for loading from API
	api?: number;

	// Is available on Iconify API
	isIconify: boolean;
}

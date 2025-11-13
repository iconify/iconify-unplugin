import type { IconifyIcon } from '@iconify/types';

export interface LoadedIconData {
	// Icon name
	prefix: string;
	name: string;

	// Is available on Iconify API
	isIconify: boolean;

	// Custom fallback icon name, in format 'prefix:name'
	fallback?: string;

	// Icon data
	data: IconifyIcon;
}

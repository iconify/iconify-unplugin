import type { IconifyIcon } from '@iconify/types';
import type { LoadedIconData } from '../types/icon.js';
import { convertIconifyIconToFactoryContent } from '@cyberalien/svg-utils/lib/components/prepare/iconify.js';
import type { ConvertSVGContentOptions } from '@cyberalien/svg-utils/lib/svg-css/types.js';

interface Options {
	icon: Pick<LoadedIconData, 'prefix' | 'name' | 'fallback' | 'isIconify'>;
	options: ConvertSVGContentOptions;
}

/**
 * Convert Iconify icon data
 */
export function convertIconifyIcon(
	data: IconifyIcon,
	options: Options
): LoadedIconData {
	const { icon, options: convertOptions } = options;
	return {
		...convertIconifyIconToFactoryContent(data, icon.prefix, icon.name, {
			...convertOptions,
			fallback: icon.fallback || false,
		}),
		isIconify: icon.isIconify,
	};
}

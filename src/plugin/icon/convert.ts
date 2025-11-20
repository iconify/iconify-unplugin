import type { IconifyIcon } from '@iconify/types';
import type { LoadedIconData } from '../types/icon.js';
import { convertIconifyIconToFactoryContent } from '@cyberalien/svg-utils/lib/components/prepare/iconify.js';
import type { ConvertSVGContentOptions } from '@cyberalien/svg-utils/lib/svg-css/types.js';
import { normaliseIconifyIcon } from '@cyberalien/svg-utils/lib/iconify/icon/nornalise.js';
import type { IconMode } from '../types/mode.js';

interface Options {
	// Icon data
	icon: Pick<LoadedIconData, 'prefix' | 'name' | 'fallback' | 'isIconify'>;

	// Options
	options: ConvertSVGContentOptions;

	// Rendering mode
	mode: IconMode;
}

/**
 * Convert Iconify icon data
 */
export function convertIconifyIcon(
	data: IconifyIcon,
	options: Options
): LoadedIconData {
	const { icon, options: convertOptions } = options;

	if (options.mode === 'svg') {
		// Full SVG
		const { body, viewBox } = normaliseIconifyIcon(data);
		return {
			prefix: icon.prefix,
			name: icon.name,
			viewBox,
			icon: {
				content: body,
			},
			isIconify: icon.isIconify,
		};
	}

	return {
		...convertIconifyIconToFactoryContent(data, icon.prefix, icon.name, {
			...convertOptions,
			fallback: icon.fallback || false,
		}),
		isIconify: icon.isIconify,
	};
}

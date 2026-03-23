import type { IconifyIcon } from '@iconify/types';
import type { LoadedIconData } from '../types/icon.js';
import { convertIconifyIconToFactoryContent } from '@cyberalien/svg-utils/lib/components/prepare/iconify.js';
import type { ConvertSVGContentOptions } from '@cyberalien/svg-utils/lib/svg-css/types.js';
import { normaliseIconifyIcon } from '@cyberalien/svg-utils/lib/iconify/icon/normalise.js';
import type { IconMode } from '../types/mode.js';
import { defaultCSSHashOptions } from '../helpers/config.js';

interface Options {
	// Icon data
	prefix: string;
	name: string;
	fallback?: string;

	// Is available on Iconify API (for use in fallback)
	useFallback: boolean;

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
	const {
		prefix,
		name,
		fallback,
		useFallback,
		options: convertOptions,
	} = options;

	if (options.mode === 'svg') {
		// Full SVG, no fallback
		const { body, viewBox } = normaliseIconifyIcon(data);
		return {
			prefix,
			name,
			icon: {
				viewBox,
				content: body,
			},
			useFallback: false,
		};
	}

	return {
		...convertIconifyIconToFactoryContent(data, prefix, name, {
			...convertOptions,
			fallback: fallback || useFallback,
			context: defaultCSSHashOptions.context,
		}),
		useFallback,
	};
}

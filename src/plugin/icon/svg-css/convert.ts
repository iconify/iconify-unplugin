import { convertIconifyIconToFactoryContent } from '@cyberalien/svg-utils/lib/components/prepare/iconify.js';
import type { CSSHashOptions } from '@cyberalien/svg-utils/lib/css/types.js';
import type { LoadedIconData } from '../../types/icon.js';
import type { FactoryIconData } from '@cyberalien/svg-utils/lib/components/types/data.js';

/**
 * Convert Iconify icon to FactoryIconData
 */
export function convertIconifyIcon(
	data: LoadedIconData,
	hashOptions: CSSHashOptions
): FactoryIconData {
	// Convert icon
	const result = convertIconifyIconToFactoryContent(
		data.data,
		data.prefix,
		data.name,
		{
			hashOptions,
			fallback: data.fallback,
		}
	);

	if (!data.isIconify && !data.fallback) {
		// Delete fallback if icon is not from Iconify and no fallback is set
		delete result.fallback;
	}

	return result;
}

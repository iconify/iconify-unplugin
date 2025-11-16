import type { FactoryIconData } from '@cyberalien/svg-utils/lib/components/types/data.js';

export interface LoadedIconData extends FactoryIconData {
	// Is available on Iconify API
	isIconify: boolean;
}

import type { FactoryIconData } from '@cyberalien/svg-utils/lib/components/types/data.js';

export interface LoadedIconData extends FactoryIconData {
	// Use fallback for icon
	useFallback: boolean;
}

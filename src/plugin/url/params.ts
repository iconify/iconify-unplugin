import type { IconMode } from '../types/mode.js';

/**
 * Clean up fallback parameter
 */
export function getFallbackParam(query: URLSearchParams): string | undefined {
	const fallback = query.get('fallback');
	if (fallback) {
		const parts = fallback.split(/[^a-z0-9-]/);
		if (parts.length === 2) {
			return `${parts[0]}:${parts[1]}`;
		}
	}
}

/**
 * Clean up fallback parameter
 */
export function getBooleanParam<T>(
	query: URLSearchParams,
	key: string,
	defaultValue: T
): boolean | T {
	const value = query.get(key);
	switch (value) {
		case 'true':
		case '':
		case '1':
			return true;

		case 'false':
		case '0':
			return false;

		default:
			return defaultValue;
	}
}

/**
 * Get icon rendering mode
 */
export function getIconRenderingMode(
	query: URLSearchParams,
	defaultMode?: IconMode
): IconMode {
	const value = query.get('mode');
	switch (value) {
		case 'svg':
		case 'svg+css':
			return value;

		case 'svg_css':
		case 'svgcss':
			return 'svg+css';
	}

	return defaultMode ?? 'svg+css';
}

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

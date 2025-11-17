export interface SplitURL {
	// Prefix before namespace
	prefix: string;

	// Namespace
	namespace: string;

	// Path to file
	directory: string;

	// Filename
	filename: string;

	// Extension (without dot)
	extension: string;

	// Query string (without ?)
	query: URLSearchParams;
}

export interface NormalizedURL extends SplitURL {
	// URL type
	type: 'asset' | 'component';
}

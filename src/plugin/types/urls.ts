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

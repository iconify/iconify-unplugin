/**
 * Get all possible path prefixes for namespace
 */
export function getNamespacePrefixes(namespace: string): string[] {
	return [
		`/~${namespace}/`,
		`~${namespace}/`,
		`/virtual:${namespace}/`,
		`virtual:${namespace}/`,
		`virtual/${namespace}/`,
	];
}

/**
 * Default prefix
 */
export function defaultNamespacePrefix(namespace: string): string {
	return `/~${namespace}/`;
}

import { defaultNamespacePrefix, getNamespacePrefixes } from './namespace.js';
import type { SplitURL } from '../types/urls.js';

/**
 * Split URL into components
 */
export function splitURL(url: string, namespace: string): SplitURL | undefined {
	// Check for namespace prefixes
	const prefixes = getNamespacePrefixes(namespace);
	for (const prefixMatch of prefixes) {
		if (url.startsWith(prefixMatch)) {
			// Split URL without namespace to separate query string
			const parts = url.slice(prefixMatch.length).split('?');
			const basePath = parts.shift() as string;
			const queryString = parts.join('?');
			const query = new URLSearchParams(queryString ?? '');

			// Split base path to get file name
			const basePathParts = basePath.split('/');
			if (basePathParts.length !== 2) {
				// 2 parts only: directory + filename
				return;
			}
			const fullFilename = basePathParts.pop() as string;
			const directory = basePathParts.join('/');
			if (!directory || !fullFilename) {
				// Empty directory or filename
				return;
			}

			// Split prefix to get actual prefix used
			const prefix = prefixMatch.slice(0, -`${namespace}/`.length);

			// Split filename to get extension
			const filenameParts = fullFilename.split('.');
			if (filenameParts.length > 1) {
				const filename = filenameParts.shift() as string;
				const extension = filenameParts.join('.') as string;
				return {
					prefix,
					namespace,
					directory,
					filename,
					extension,
					query,
				};
			}
			return {
				prefix,
				namespace,
				directory,
				filename: fullFilename,
				extension: '',
				query,
			};
		}
	}
}

/**
 * Merge URL
 */
export function mergeURL(url: SplitURL): string {
	const queryString = url.query.toString();
	return (
		defaultNamespacePrefix(url.namespace) +
		url.directory +
		'/' +
		url.filename +
		(url.extension ? `.${url.extension}` : '') +
		(queryString ? `?${queryString}` : '')
	);
}

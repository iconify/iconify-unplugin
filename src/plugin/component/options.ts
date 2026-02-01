import type { ComponentFactoryOptions } from '@cyberalien/svg-utils/lib/components/types/options.js';
import { cssDirectory, helpersDirectory } from '../url/const.js';
import { defaultNamespacePrefix } from '../url/namespace.js';
import { defaultCSSHashOptions } from '../helpers/config.js';

/**
 * Get component factory options
 */
export function createComponentFactoryOptions(
	namespace: string
): ComponentFactoryOptions {
	const basePath = defaultNamespacePrefix(namespace);

	return {
		doubleDirsForComponents: false,
		doubleDirsForCSS: false,
		prefixDirsForComponents: true,
		rootPath: {
			// import: '../..',
			import: basePath.slice(0, -1),
			filename: basePath.slice(0, -1),
		},
		cssMode: 'import',
		cssPath: {
			// import: `../../${cssDirectory}`,
			import: `${basePath}${cssDirectory}`,
			filename: `${basePath}${cssDirectory}`,
		},
		sharedTypes: false,
		helpersDirectory,
		context: defaultCSSHashOptions.context,
	};
}

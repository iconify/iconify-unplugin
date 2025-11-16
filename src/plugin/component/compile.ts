import type { FactoryGeneratedComponent } from '@cyberalien/svg-utils/lib/components/types/component.js';
import { createVueFunctionalComponent } from '@cyberalien/svg-utils/lib/components/vue-func.js';
import type { LoadedIconData } from '../types/icon.js';
import type { CleanedPluginOptions } from '../types/options.js';
import type { SplitURL } from '../types/urls.js';
import { createComponentFactoryOptions } from './options.js';

/**
 * Compile component
 */
export function compileComponent(
	icon: LoadedIconData,
	path: SplitURL,
	options: CleanedPluginOptions
): FactoryGeneratedComponent | undefined {
	// Get options
	const factoryOptions = createComponentFactoryOptions(options.namespace);

	const compiler = options.compiler;
	switch (compiler) {
		case 'vue':
			return createVueFunctionalComponent(
				{
					...icon,
					// Disable fallback for now, until dependency check is added
					fallback: '',
				},
				factoryOptions
			);
	}

	return;
}

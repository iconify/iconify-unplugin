import type { FactoryGeneratedComponent } from '@cyberalien/svg-utils/lib/components/types/component.js';
import { createRawComponent } from '@cyberalien/svg-utils/lib/components/raw.js';
import { createSvelteComponent } from '@cyberalien/svg-utils/lib/components/svelte.js';
import { createVueFunctionalComponent } from '@cyberalien/svg-utils/lib/components/vue-func.js';
import { makeSquareViewBox } from '@cyberalien/svg-utils/lib/svg/viewbox/square.js';
import type { LoadedIconData } from '../types/icon.js';
import type { CleanedPluginOptions } from '../types/options.js';
import type { NormalizedURL } from '../types/urls.js';
import { createComponentFactoryOptions } from './options.js';
import { getBooleanParam } from '../url/params.js';
import { compileSvelteComponent } from './svelte.js';

/**
 * Compile component
 */
export async function compileComponent(
	icon: LoadedIconData,
	path: NormalizedURL,
	options: CleanedPluginOptions
): Promise<FactoryGeneratedComponent | undefined> {
	// Get options
	const factoryOptions = createComponentFactoryOptions(options.namespace);

	// Check props
	const query = path.query;

	// Make icon square
	if (getBooleanParam(query, 'square', false)) {
		icon = {
			...icon,
			viewBox: makeSquareViewBox(icon.viewBox),
		};
	}

	// Set width/height
	const size = query.get('size');
	if (size) {
		factoryOptions.width = size;
		factoryOptions.height = size;
	}

	const width = query.get('width');
	if (width) {
		factoryOptions.width = width;
	}

	const height = query.get('height');
	if (height) {
		factoryOptions.height = height;
	}

	// Compile component
	const compiler = query.get('compiler');
	switch (compiler) {
		case 'raw':
			return createRawComponent(icon, factoryOptions);

		case 'vue':
			return createVueFunctionalComponent(icon, factoryOptions);

		case 'svelte': {
			const component = createSvelteComponent(icon, factoryOptions);
			return {
				...component,
				content: await compileSvelteComponent(component.content),
			};
		}
	}

	return;
}

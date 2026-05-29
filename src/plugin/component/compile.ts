import type { FactoryGeneratedComponent } from '@cyberalien/svg-utils/lib/components/types/component.js';
import { createRawComponent } from '@cyberalien/svg-utils/lib/components/raw.js';
import { createSvelteComponent } from '@cyberalien/svg-utils/lib/components/svelte.js';
import { createVueFunctionalComponent } from '@cyberalien/svg-utils/lib/components/vue-func.js';
import { createJSXComponent } from '@cyberalien/svg-utils/lib/components/jsx.js';
import { createAstroComponent } from '@cyberalien/svg-utils/lib/components/astro.js';
import { makeSquareViewBox } from '@cyberalien/svg-utils/lib/svg/viewbox/square.js';
import type { LoadedIconData } from '../types/icon.js';
import type { CleanedPluginOptions } from '../types/options.js';
import type { NormalizedURL } from '../types/urls.js';
import { createComponentFactoryOptions } from './options.js';
import { getBooleanParam, getIconCSSRenderingMode } from '../url/params.js';
import { compileSvelteComponent } from './svelte.js';
import type { ComponentCompiler } from '../types/compiler.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertInvalidCompiler(value: undefined) {
	//
}

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

	// Get CSS mode
	factoryOptions.cssMode = getIconCSSRenderingMode(path.query, options.css);

	// Check props
	const query = path.query;

	// Make icon square
	if (getBooleanParam(query, 'square', false)) {
		icon = {
			...icon,
			icon: {
				...icon.icon,
				viewBox: makeSquareViewBox(icon.icon.viewBox),
			},
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
	const compiler = query.get('compiler') as ComponentCompiler | undefined;
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

		case 'react':
			return createJSXComponent(icon, {
				...factoryOptions,
				jsx: 'react',
				fallbackPackage: '@iconify/css-react',
			});

		case 'preact':
			return createJSXComponent(icon, {
				...factoryOptions,
				jsx: 'preact',
				fallbackPackage: '@iconify/css-react',
			});

		case 'astro':
			return createAstroComponent(icon, factoryOptions);

		default:
			assertInvalidCompiler(compiler);
	}

	return;
}

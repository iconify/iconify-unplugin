import { uniquePromise } from '@cyberalien/svg-utils/lib/helpers/misc/promises.js';

let svelteCompiler: typeof import('svelte/compiler') | undefined;

/**
 * Compile Svelte component
 */
export async function compileSvelteComponent(code: string): Promise<string> {
	// Load compiler
	if (!svelteCompiler) {
		svelteCompiler = await uniquePromise(
			'load-svelte-compiler',
			() => import('svelte/compiler')
		);
	}

	const result = await svelteCompiler.preprocess(code, {
		name: 'Icon',
	});
	return result.code;
}

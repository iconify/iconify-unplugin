import type { FactoryGeneratedComponent } from '@cyberalien/svg-utils/lib/components/types/component.js';
import { writeToCache } from '../cache/write.js';
import { splitURL } from '../url/split.js';

/**
 * Stringify component to code, cache assets
 */
export async function prepareComponentForRender(
	data: FactoryGeneratedComponent,
	namespace: string
): Promise<string> {
	// console.log('component data:', data);

	// Save all assets
	for (const asset of data.assets) {
		const { filename, content } = asset;
		const path = splitURL(filename, namespace);
		// console.log('caching asset to path:', filename, path);
		if (path) {
			await writeToCache(path, content);
		}
	}

	// Return content
	return data.content;
}

import { readFile } from 'node:fs/promises';
import type { IconifyJSON } from '@iconify/types';
import { getPackageRootPath } from './package.js';

interface IconSetData {
	prefix: string;
	data: IconifyJSON;
	isIconify: boolean;
}

/**
 * Load icon set by prefix
 */
export async function loadIconSet(prefix: string): Promise<IconSetData | null> {
	// Try '@iconify/json' package
	const fullPackage = await getPackageRootPath('@iconify/json');
	if (fullPackage) {
		// Load icon set
		try {
			const data = await readFile(
				`${fullPackage}/icon-sets/${prefix}.json`,
				'utf8'
			);
			return {
				prefix,
				data: JSON.parse(data) as IconifyJSON,
				isIconify: true,
			};
		} catch {
			//
		}
	}

	// Try '@iconify-json/{prefix}' package
	const packageName = `@iconify-json/${prefix}`;
	const packageRoot = await getPackageRootPath(packageName);
	if (packageRoot) {
		// Load icon set
		try {
			const data = await readFile(`${packageRoot}/icons.json`, 'utf8');
			return {
				prefix,
				data: JSON.parse(data) as IconifyJSON,
				isIconify: true,
			};
		} catch {
			//
		}
	}

	return null;
}

import type { IconifyJSON } from '@iconify/types';
import { getPackageInfo } from 'local-pkg';

const pathCache: Record<string, string | null> = {};

/**
 * Get package root path
 */
export async function getPackageRootPath(name: string): Promise<string | null> {
	if (!(name in pathCache)) {
		const data = await getPackageInfo(name);
		pathCache[name] = data ? data.rootPath : null;
	}
	return pathCache[name];
}

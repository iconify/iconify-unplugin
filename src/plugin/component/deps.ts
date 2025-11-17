const checked = new Set<string>();

/**
 * Checks if optional dependency is installed
 */
export async function assertDepenecyExists(packageName: string): Promise<void> {
	if (checked.has(packageName)) {
		return;
	}
	checked.add(packageName);

	try {
		await import(packageName);
	} catch (err) {
		console.warn(
			`To render an icon component, you need to install the following optional dependency: ${packageName}`
		);
	}
}

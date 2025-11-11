import { loadIcon } from '../src/plugin/icon/load.js';

describe('Load icon', () => {
	it('Iconify icon', async () => {
		const icon = await loadIcon('mdi-light', 'bell');
		expect(icon).toBeTruthy();
		expect(icon?.body).toBeDefined();
		expect(icon?.width).toBe(24);
		expect(icon?.height).toBe(24);
	});

	it('Missing icon', async () => {
		const icon = await loadIcon('mdi-lighter', 'bell');
		expect(icon).toBeNull();
	});
});

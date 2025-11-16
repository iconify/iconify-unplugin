import { initCacheDir } from '../src/plugin/cache/config.js';
import { loadIcon } from '../src/plugin/icon/load.js';

describe('Load icon', () => {
	beforeAll(async () => {
		await initCacheDir();
	});

	it('Iconify icon', async () => {
		// Load icon
		const icon = await loadIcon('mdi-light', 'bell', { allowAPI: false });
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('mdi-light');
		expect(icon!.name).toBe('bell');
		expect(icon!.isIconify).toBe(true);
		expect(icon!.fallback).toBe('mdi-light:bell');

		// Check icon data
		expect(icon!.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 24,
			height: 24,
		});
		const classNames = Object.keys(icon!.icon.classes!);
		expect(classNames.length).toBe(1);
		expect(icon!.icon.content).toBe(`<path class="${classNames[0]}" />`);
	});

	it('Iconify icon from API', async () => {
		// Load icon. No package, so should be loaded from API
		const icon = await loadIcon('quill', 'cog', { allowAPI: true });
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('quill');
		expect(icon!.name).toBe('cog');
		expect(icon!.isIconify).toBe(true);
		expect(icon!.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 32,
			height: 32,
		});
	});

	it('Missing icon', async () => {
		const icon = await loadIcon('mdi-lighter', 'bell', { allowAPI: false });
		expect(icon).toBeNull();
	});
});

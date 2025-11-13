import { initCacheDir } from '../src/plugin/cache/config.js';
import { loadIcon } from '../src/plugin/icon/load.js';
import { defaultCSSHashOptions } from '../src/plugin/icon/svg-css/config.js';
import { convertIconifyIcon } from '../src/plugin/icon/svg-css/convert.js';

describe('Load icon', () => {
	it('Iconify icon', async () => {
		// Load icon
		const icon = await loadIcon('mdi-light', 'bell', { allowAPI: false });
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('mdi-light');
		expect(icon!.name).toBe('bell');
		expect(icon!.isIconify).toBe(true);
		expect(icon!.data.body).toBeDefined();
		expect(icon!.data.width).toBe(24);
		expect(icon!.data.height).toBe(24);

		// Convert icon
		const converted = convertIconifyIcon(icon!, defaultCSSHashOptions);
		expect(converted).toBeTruthy();
		expect(converted!.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 24,
			height: 24,
		});
		expect(converted!.prefix).toBe('mdi-light');
		expect(converted!.name).toBe('bell');
		expect(converted!.fallback).toBe('mdi-light:bell');

		const classNames = Object.keys(converted!.icon.classes!);
		expect(classNames.length).toBe(1);
		expect(converted!.icon.content).toBe(
			`<path class="${classNames[0]}" />`
		);
	});

	it('Iconify icon from API', async () => {
		await initCacheDir();

		// Load icon. No package, so should be loaded from API
		const icon = await loadIcon('quill', 'cog', { allowAPI: true });
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('quill');
		expect(icon!.name).toBe('cog');
		expect(icon!.isIconify).toBe(true);
		expect(icon!.data.body).toBeDefined();
		expect(icon!.data.width).toBe(32);
		expect(icon!.data.height).toBe(32);
	});

	it('Missing icon', async () => {
		await initCacheDir();
		const icon = await loadIcon('mdi-lighter', 'bell', { allowAPI: false });
		expect(icon).toBeNull();
	});
});

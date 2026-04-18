import { initCacheDir } from '../src/plugin/cache/config.js';
import { loadIcon } from '../src/plugin/icon/load.js';

describe('Load icon', () => {
	beforeAll(async () => {
		await initCacheDir();
	});

	it('Iconify icon', async () => {
		// Load icon
		const icon = await loadIcon('mdi-light', 'bell', {
			allowAPI: false,
			mode: 'svg+css',
		});
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('mdi-light');
		expect(icon!.name).toBe('bell');
		expect(icon!.useFallback).toBe(true);
		expect(icon!.icon.defaultFallback).toBe('mdi-light:bell');

		// Check icon data
		expect(icon!.icon.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 24,
			height: 24,
		});
		const classNames = Object.keys(icon!.icon.classes!);
		expect(classNames.length).toBe(1);
		expect(icon!.icon.content).toBe(`<path class="${classNames[0]}"/>`);
	});

	it('Iconify icon, legacy mode', async () => {
		// Load icon
		const icon = await loadIcon('mdi-light', 'bell', {
			allowAPI: false,
			mode: 'legacy',
		});
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('mdi-light');
		expect(icon!.name).toBe('bell');
		expect(icon!.useFallback).toBe(false);
		expect(icon!.icon.defaultFallback).toBeUndefined();

		// Check icon data
		expect(icon!.icon.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 24,
			height: 24,
		});
		const classNames = Object.keys(icon!.icon.classes!);
		expect(classNames.length).toBe(1);
		expect(icon!.icon.content).toBe(
			`<path d="M12 4.5a.5.5 0 0 0-.5-.5a.5.5 0 0 0-.5.5v1.53c-2.25.25-4 2.15-4 4.47v5.91L5.41 18h12.18L16 16.41V10.5c0-2.32-1.75-4.22-4-4.47zM11.5 3A1.5 1.5 0 0 1 13 4.5v.71c2.31.65 4 2.79 4 5.29V16l3 3H3l3-3v-5.5C6 8 7.69 5.86 10 5.21V4.5A1.5 1.5 0 0 1 11.5 3m0 19a2.5 2.5 0 0 1-2.45-2h1.04a1.495 1.495 0 0 0 2.82 0h1.04a2.5 2.5 0 0 1-2.45 2" class="${classNames[0]}"/>`
		);

		// Check CSS: should not have path()
		expect(icon!.icon.classes).toEqual({
			[classNames[0]]: {
				fill: 'currentColor',
			},
		});
	});

	it('Iconify icon, SVG mode', async () => {
		// Load icon
		const icon = await loadIcon('mdi-light', 'bell', {
			allowAPI: false,
			mode: 'svg',
		});
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('mdi-light');
		expect(icon!.name).toBe('bell');
		expect(icon!.useFallback).toBe(false);
		expect(icon!.icon.defaultFallback).toBeUndefined();

		// Check icon data
		expect(icon!.icon.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 24,
			height: 24,
		});
		expect(icon!.icon.classes).toBeUndefined();
		expect(icon!.icon.content).toBe(
			'<path fill="currentColor" d="M12 4.5a.5.5 0 0 0-.5-.5a.5.5 0 0 0-.5.5v1.53c-2.25.25-4 2.15-4 4.47v5.91L5.41 18h12.18L16 16.41V10.5c0-2.32-1.75-4.22-4-4.47zM11.5 3A1.5 1.5 0 0 1 13 4.5v.71c2.31.65 4 2.79 4 5.29V16l3 3H3l3-3v-5.5C6 8 7.69 5.86 10 5.21V4.5A1.5 1.5 0 0 1 11.5 3m0 19a2.5 2.5 0 0 1-2.45-2h1.04a1.495 1.495 0 0 0 2.82 0h1.04a2.5 2.5 0 0 1-2.45 2"/>'
		);
	});

	it('Iconify icon from API', async () => {
		// Load icon. No package, so should be loaded from API
		const icon = await loadIcon('quill', 'cog', {
			allowAPI: true,
			mode: 'svg+css',
		});
		expect(icon).toBeTruthy();
		expect(icon!.prefix).toBe('quill');
		expect(icon!.name).toBe('cog');
		expect(icon!.useFallback).toBe(true);
		expect(icon!.icon.viewBox).toEqual({
			left: 0,
			top: 0,
			width: 32,
			height: 32,
		});
	});

	it('Missing icon', async () => {
		const icon = await loadIcon('mdi-lighter', 'bell', {
			allowAPI: false,
			mode: 'svg+css',
		});
		expect(icon).toBeNull();
	});
});

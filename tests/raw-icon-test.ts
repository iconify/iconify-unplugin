import { createRawComponent } from '@cyberalien/svg-utils/lib/components/raw.js';
import { initCacheDir } from '../src/plugin/cache/config.js';
import { createComponentFactoryOptions } from '../src/plugin/component/options.js';
import { loadIcon } from '../src/plugin/icon/load.js';

describe('Load icon', () => {
	beforeAll(async () => {
		await initCacheDir();
	});

	it('Render icon as is', async () => {
		// Get options
		const options = createComponentFactoryOptions('iconify');

		// Load icon
		const icon = await loadIcon('mdi-light', 'bell', { allowAPI: false });
		if (!icon) {
			throw new Error('Icon not loaded');
		}

		// Get class name used in icon
		const classNames = Object.keys(icon.icon.classes!);
		expect(classNames.length).toBe(1);
		const className = classNames[0];

		// Generate component
		const result = createRawComponent(icon, {
			...options,
			cssMode: 'import',
			height: '1em',
		});

		// Check assets: css file + types
		expect(result.assets).toHaveLength(2);

		// First asset should be a CSS file
		const cssAsset = result.assets[0];
		expect(cssAsset.filename).toEqual(`/~iconify/_css/${className}.css`);
		expect(cssAsset.import).toEqual(`../../_css/${className}.css`);

		// Second asset should be types
		const typesAsset = result.assets[1];
		expect(typesAsset.filename).toEqual(`/~iconify/mdi-light/bell.d.ts`);
		expect(typesAsset.import).toEqual(`./bell.d.ts`);
	});
});

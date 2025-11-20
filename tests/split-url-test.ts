import { splitURL, mergeURL } from '../src/plugin/url/split.js';
import { cssDirectory, helpersDirectory } from '../src/plugin/url/const.js';
import { normaliseURL } from '../src/plugin/url/normalise.js';

describe('Split and merge URLs', () => {
	function toURLParams(data: Record<string, string>) {
		const params = new URLSearchParams();
		for (const key in data) {
			params.append(key, data[key]);
		}
		return params;
	}

	it('Assets', () => {
		// CSS file, use '~' prefix
		const split1 = splitURL(
			`~iconify/${cssDirectory}/fooBar.css`,
			'iconify'
		);
		expect(split1).toEqual({
			prefix: '~',
			namespace: 'iconify',
			directory: cssDirectory,
			filename: 'fooBar',
			extension: 'css',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split1!)).toBe(`/~iconify/${cssDirectory}/fooBar.css`);

		// Normalise URL (should not change anything because of reserved directory)
		const normalised1 = normaliseURL(split1!, 'svelte');
		expect(normalised1!.type).toBe('asset');
		expect(mergeURL(normalised1!)).toBe(
			`/~iconify/${cssDirectory}/fooBar.css`
		);

		// Helper file
		const split2 = splitURL(`~test/${helpersDirectory}/size.js`, 'test');
		expect(split2).toEqual({
			prefix: '~',
			namespace: 'test',
			directory: helpersDirectory,
			filename: 'size',
			extension: 'js',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split2!)).toBe(`/~test/${helpersDirectory}/size.js`);

		// Normalise URL (should not change anything because of reserved directory)
		const normalised2 = normaliseURL(split2!, 'svelte');
		expect(normalised2!.type).toBe('asset');
		expect(mergeURL(normalised2!)).toBe(
			`/~test/${helpersDirectory}/size.js`
		);

		// Types file
		const split3 = splitURL(`~test/mdi-light/bell.d.ts`, 'test');
		expect(split3).toEqual({
			prefix: '~',
			namespace: 'test',
			directory: 'mdi-light',
			filename: 'bell',
			extension: 'd.ts',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split3!)).toBe(`/~test/mdi-light/bell.d.ts`);

		// Normalise URL (should not change anything because of reserved directory)
		const normalised3 = normaliseURL(split3!, 'vue');
		expect(normalised3!.type).toBe('asset');
		expect(mergeURL(normalised3!)).toBe(`/~test/mdi-light/bell.d.ts`);

		// CSS module
		const split4 = splitURL(
			`~iconify/${cssDirectory}/test.module.css`,
			'iconify'
		);
		expect(split4).toEqual({
			prefix: '~',
			namespace: 'iconify',
			directory: cssDirectory,
			filename: 'test',
			extension: 'module.css',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split4!)).toBe(
			`/~iconify/${cssDirectory}/test.module.css`
		);

		// Normalise URL (should not change anything because of reserved directory)
		const normalised4 = normaliseURL(split4!, 'svelte');
		expect(normalised4!.type).toBe('asset');
		expect(mergeURL(normalised4!)).toBe(
			`/~iconify/${cssDirectory}/test.module.css`
		);
	});

	it('Valid URLs', () => {
		// Simple URL, 'virtual:' prefix
		const split1 = splitURL('virtual:iconify/mdi-light/bell', 'iconify');
		expect(split1).toEqual({
			prefix: 'virtual:',
			namespace: 'iconify',
			directory: 'mdi-light',
			filename: 'bell',
			extension: '',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split1!)).toBe('/~iconify/mdi-light/bell');

		// Normalise URL without extension or compiler - should fail
		expect(normaliseURL(split1!)).toBeUndefined();
		expect(mergeURL(split1!)).toBe('/~iconify/mdi-light/bell');

		// Normalise URL with default compiler
		const normalised1 = normaliseURL(split1!, 'react');
		expect(normalised1!.type).toBe('component');
		expect(mergeURL(normalised1!)).toBe(
			'/~iconify/mdi-light/bell.jsx?compiler=react'
		);

		// Normalise URL with a different compiler, keep custom extension
		split1!.query.delete('compiler');
		split1!.extension = '';
		const normalised1a = normaliseURL(split1!, 'raw');
		expect(normalised1a!.type).toBe('component');
		expect(mergeURL(normalised1a!)).toBe(
			'/~iconify/mdi-light/bell.js?compiler=raw'
		);

		split1!.extension = 'ts';
		const normalised1b = normaliseURL(split1!, 'raw');
		expect(normalised1b!.type).toBe('component');
		expect(mergeURL(normalised1b!)).toBe(
			'/~iconify/mdi-light/bell.ts?compiler=raw'
		);

		// Use 'virtual/' prefix, with extension
		const split2 = splitURL(
			'virtual/iconify/mdi-light/bell.vue',
			'iconify'
		);
		expect(split2).toEqual({
			prefix: 'virtual/',
			namespace: 'iconify',
			directory: 'mdi-light',
			filename: 'bell',
			extension: 'vue',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split2!)).toBe('/~iconify/mdi-light/bell.vue');

		// Normalise URL based on extension
		const normalised2 = normaliseURL(split2!);
		expect(normalised2!.type).toBe('component');
		expect(mergeURL(normalised2!)).toBe(
			'/~iconify/mdi-light/bell.js?compiler=vue'
		);

		// Use '/~' prefix
		const split3 = splitURL('/~iconify/mdi-light/bell', 'iconify');
		expect(split3).toEqual({
			prefix: '/~',
			namespace: 'iconify',
			directory: 'mdi-light',
			filename: 'bell',
			extension: '',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split3!)).toBe('/~iconify/mdi-light/bell');

		// Query string
		const split4 = splitURL(
			'/~iconify/mdi-light/bell.vue?compiler=vue&mode=svg&square',
			'iconify'
		);
		expect(split4).toEqual({
			prefix: '/~',
			namespace: 'iconify',
			directory: 'mdi-light',
			filename: 'bell',
			extension: 'vue',
			query: toURLParams({
				compiler: 'vue',
				mode: 'svg',
				square: '',
			}),
		});
		expect(mergeURL(split4!)).toBe(
			'/~iconify/mdi-light/bell.vue?compiler=vue&mode=svg&square='
		);

		// Normalise URL, default compiler should be ignored
		const normalised4 = normaliseURL(split4!, 'svelte');
		expect(normalised4!.type).toBe('component');
		expect(mergeURL(normalised4!)).toBe(
			'/~iconify/mdi-light/bell.js?compiler=vue&mode=svg&square='
		);
	});

	it('Invalid URLs', () => {
		// Unexpected '/' at start
		expect(
			splitURL('/virtual/iconify/mdi-light/bell', 'iconify')
		).toBeUndefined();

		// Too many segments
		expect(
			splitURL('virtual/iconify/mdi-light/bell/outline', 'iconify')
		).toBeUndefined();

		// Too few segments
		expect(
			splitURL('virtual/iconify/mdi-light/', 'iconify')
		).toBeUndefined();
	});
});

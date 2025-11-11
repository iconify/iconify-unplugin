import { splitURL, mergeURL } from '../src/plugin/url/split.js';
import { cssDirectory } from '../src/plugin/url/const.js';
import { normaliseURL } from '../src/plugin/url/normalise.js';

describe('Split and merge URLs', () => {
	function toURLParams(data: Record<string, string>) {
		const params = new URLSearchParams();
		for (const key in data) {
			params.append(key, data[key]);
		}
		return params;
	}

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

		// Normalise URL without extension or compiler
		normaliseURL(split1!);
		expect(mergeURL(split1!)).toBe('/~iconify/mdi-light/bell');

		// Normalise URL with default compiler
		normaliseURL(split1!, 'react');
		expect(mergeURL(split1!)).toBe(
			'/~iconify/mdi-light/bell.jsx?compiler=react'
		);

		// Normalise URL with a different compiler, keep custom extension
		split1!.query.delete('compiler');
		split1!.extension = '';
		normaliseURL(split1!, 'raw');
		expect(mergeURL(split1!)).toBe(
			'/~iconify/mdi-light/bell.js?compiler=raw'
		);

		split1!.extension = 'ts';
		normaliseURL(split1!, 'raw');
		expect(mergeURL(split1!)).toBe(
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
		normaliseURL(split2!);
		expect(mergeURL(split2!)).toBe(
			'/~iconify/mdi-light/bell.vue?compiler=vue'
		);

		// Use '~' prefix
		const split3 = splitURL(
			`~iconify/${cssDirectory}/fooBar.css`,
			'iconify'
		);
		expect(split3).toEqual({
			prefix: '~',
			namespace: 'iconify',
			directory: cssDirectory,
			filename: 'fooBar',
			extension: 'css',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split3!)).toBe(`/~iconify/${cssDirectory}/fooBar.css`);

		// Normalise URL (should not change anything because of reserved directory)
		normaliseURL(split3!, 'svelte');
		expect(mergeURL(split3!)).toBe(`/~iconify/${cssDirectory}/fooBar.css`);

		// Use '/~' prefix
		const split4 = splitURL('/~iconify/mdi-light/bell', 'iconify');
		expect(split4).toEqual({
			prefix: '/~',
			namespace: 'iconify',
			directory: 'mdi-light',
			filename: 'bell',
			extension: '',
			query: new URLSearchParams(),
		});
		expect(mergeURL(split4!)).toBe('/~iconify/mdi-light/bell');

		// Query string
		const split5 = splitURL(
			'/~iconify/mdi-light/bell.vue?compiler=vue&mode=svg&square',
			'iconify'
		);
		expect(split5).toEqual({
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
		expect(mergeURL(split5!)).toBe(
			'/~iconify/mdi-light/bell.vue?compiler=vue&mode=svg&square='
		);

		// Normalise URL, default compiler should be ignored
		normaliseURL(split5!, 'svelte');
		expect(mergeURL(split5!)).toBe(
			'/~iconify/mdi-light/bell.vue?compiler=vue&mode=svg&square='
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

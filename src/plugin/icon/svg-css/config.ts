import type { CSSHashOptions } from '@cyberalien/svg-utils/lib/css/types.js';

export const defaultCSSHashOptions: CSSHashOptions = {
	// Use short hashes for small content
	length: (content) => (content.length > 256 ? 8 : 7),
	// Known collisions in default sets
	lengths: {
		'warqd5b': 8,
		'w86iqpb': 8,
		'z2tu_cb': 8,
		'dyv-ywb': 8,
		'e7ntkkb': 8,
		'gckfc3b': 8,
	},
};

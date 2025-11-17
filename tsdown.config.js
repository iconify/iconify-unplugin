import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/*.ts'],
	dts: true,
	format: ['esm', 'cjs'],
	outDir: 'dist',
	clean: true,
	unbundle: false,
	exports: false,
	inputOptions: {
		experimental: {
			attachDebugInfo: 'none',
		},
	},
	external: [
		'@cyberalien/svg-utils',
		'@iconify/types',
		'preact',
		'react',
		'svelte',
		'svelte/compiler',
		'vue',
	],
});

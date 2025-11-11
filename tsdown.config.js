import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/*.ts', 'src/types/*.ts'],
	dts: true,
	format: ['esm', 'cjs'],
	outDir: 'dist',
	clean: true,
	unbundle: true,
	exports: true,
	inputOptions: {
		experimental: {
			attachDebugInfo: 'none',
		},
	},
	external: ['@iconify/types', 'preact', 'react', 'svelte', 'vue'],
});

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Icons from '@iconify/unplugin/vite';

export default defineConfig({
	plugins: [
		svelte(),
		Icons({
			compiler: 'svelte',
		}),
	],
});

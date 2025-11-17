import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Icons from 'unplugin-iconify/vite';

export default defineConfig({
	plugins: [
		svelte(),
		Icons({
			compiler: 'svelte',
		}),
	],
});

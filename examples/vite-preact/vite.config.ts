import Preact from '@preact/preset-vite';
import Icons from '@iconify/unplugin/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Preact(),
		Icons({
			compiler: 'preact',
		}),
		Icons({
			compiler: 'raw',
			namespace: 'iconify-raw',
		}),
	],
});

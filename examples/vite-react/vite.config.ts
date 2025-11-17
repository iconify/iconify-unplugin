import React from '@vitejs/plugin-react-refresh';
import Icons from '@iconify/unplugin/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		React(),
		Icons({
			compiler: 'react',
		}),
		Icons({
			compiler: 'raw',
			namespace: 'iconify-raw',
		}),
	],
});

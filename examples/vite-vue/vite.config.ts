import type { UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from '@iconify/unplugin/vite';

const config: UserConfig = {
	plugins: [
		Vue(),
		Icons({
			compiler: 'vue',
		}),
		Icons({
			compiler: 'raw',
			namespace: 'iconify-raw',
		}),
	],
};

export default config;

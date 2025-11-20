const Icons = require('@iconify/unplugin/webpack');

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack(config) {
		config.plugins.push(
			Icons({
				compiler: 'react',
				css: 'module',
			}),
			Icons({
				compiler: 'raw',
				namespace: 'iconify-raw',
				mode: 'svg',
			})
		);
		return config;
	},
};

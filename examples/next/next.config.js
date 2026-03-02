const Icons = require('@iconify/unplugin/webpack');

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack(config) {
		config.plugins.push(
			Icons({
				compiler: 'react',
				css: 'embed',
			}),
			Icons({
				compiler: 'raw',
				namespace: 'iconify-raw',
				css: 'embed',
			})
		);
		return config;
	},
};

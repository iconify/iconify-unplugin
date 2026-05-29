/// <reference types="astro/astro-jsx" />

declare module '~iconify/*' {
	const component: (
		props: astroHTML.JSX.SVGAttributes
	) => astroHTML.JSX.Element;
	export default component;
}
declare module 'virtual:iconify/*' {
	const component: (
		props: astroHTML.JSX.SVGAttributes
	) => astroHTML.JSX.Element;
	export default component;
}

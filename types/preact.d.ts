declare module 'virtual:iconify/*' {
	import type { JSX } from 'preact';

	const component: (props: JSX.SVGAttributes<SVGSVGElement>) => JSX.Element;
	export default component;
}
declare module '~iconify/*' {
	import type { JSX } from 'preact';

	const component: (props: JSX.SVGAttributes<SVGSVGElement>) => JSX.Element;
	export default component;
}

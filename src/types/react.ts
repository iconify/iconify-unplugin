declare module 'virtual:iconify/*' {
	import type { ForwardRefExoticComponent, SVGProps } from 'react';

	const component: ForwardRefExoticComponent<
		SVGProps<SVGSVGElement> & { title?: string }
	>;
	export default component;
}
declare module '~iconify/*' {
	import type { ForwardRefExoticComponent, SVGProps } from 'react';

	const component: ForwardRefExoticComponent<
		SVGProps<SVGSVGElement> & { title?: string }
	>;
	export default component;
}

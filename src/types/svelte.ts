declare module 'virtual:iconify/*' {
	import type { Component } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	const component: Component<SvelteHTMLElements['svg']>;

	export default component;
}

declare module '~iconify/*' {
	import type { Component } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	const component: Component<SvelteHTMLElements['svg']>;

	export default component;
}

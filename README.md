# Iconify Unplugin

This library generates icon components on demand. It works with multiple frameworks and bundlers.

It uses Iconify as source for icons, which offers over 200 open source icon sets with almost 300k icons.

## Usage example

```vue
<script setup>
import BellIcon from '/~iconify/mdi-light/bell';
</script>
<template>
	<BellIcon height="1em" />
</template>
```

## SVG with CSS

The big difference from other solutions is, icons are split into SVG and CSS parts.

Instead of rendering full SVG like this:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill="currentColor" d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2" />
</svg>
```

Iconify Unplugin renders smaller SVG:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path class="mdi-account-box" />
</svg>
```

and moves all shapes to CSS:

```css
.mdi-account-box {
	fill: currentColor;
	d: path(
		'M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2'
	);
}
```

See [SVG + CSS](https://cyberalien.dev/articles/svg-css/) for details.

Why is this better?

-   Reduces HTML size, especially noticesable when the same icon is used multiple times.
-   CSS is cached, so icon content is cached by browser instead of being included in HTML.

### Safari browser

There is one issue though, currently Safari browser does not support `d` attribute for `<path />` in CSS.

To work around this issue, components include dynamic fallback, which is loaded and rendered only for outdated browsers.

See [solving Safari fallback for SVG+CSS](https://cyberalien.dev/articles/safari-svg-path/).

In future, when Safari will finally join the modern browsers (hopefully soon because Safari Technology Preview supported this since 2024), fallback can be removed.
This will make it possible to add support for more frameworks and render icons as raw HTML strings, not components.

## Installation

Installation depends on bundler and framework you are using.

See examples in `examples` directory for... examples.

First step is to install `@iconify/unplugin` as a dependency.

### Vite

For Vite, open `vite.config.js`, add import statement for plugin and plugin entry in `plugins` property.

Example configuration:

```js
import { defineConfig } from 'vite';
import Icons from '@iconify/unplugin/vite';

export default defineConfig({
	plugins: [
		Icons({
			// Change to 'vue' for Vue, 'react' for React, etc...
			compiler: 'svelte',
		}),
	],
});
```

### Framework specific fallbacks

To support Safari browser, you need to install the following dev dependencies:

-   For Vue: `@iconify/css-vue`
-   For Svelte: `@iconify/css-svelte`
-   For React: `@iconify/css-react`

## Icon sets

Plugin does not include icons.

If you want access to all icons, add `@iconify/json` as a dev dependency.

If you want access to only several icon sets, add `@iconify-json/{prefix}` dependencies for each icon set (replace `{prefix}` with icon set prefix).

Plugin can also load icons from Iconify API and cache it, but this could be slow, so better install dependencies mentioned above.

## Usage

Import icon component from `/~iconify/{prefix}/{name}`, where:

-   `{prefix}` is icon set prefix, such as "mdi"
-   `{name}` is icon name, such as "home"

See [Iconify icon sets](https://icon-sets.iconify.design/) for all icons.
Select icon and you'll see an option to copy icon name.

Then use that icon as component.

### Vue example

```vue
<script setup>
import BellIcon from '/~iconify/mdi-light/bell';
</script>
<template>
	<BellIcon height="1em" />
</template>
```

### Svelte example

```svelte
<script>
import BellIcon from '/~iconify/mdi-light/bell';
</script>

<BellIcon height="1em" />
```

## Parameters

You can add parameters to component URL:

```js
import BellIcon from '/~iconify/mdi-light/bell?height=1em&compiler=vue';
```

Supported parameters:

-   `square=true` - makes icon's viewBox square.
-   `width` and `height` - sets icon size: `height=1em`.
-   `size` sets both `width` and `height`: `size=1em`.
-   `fallback` overrides fallback icon name for Safari browser. Set it to an empty string to disable Safari fallback.
-   `compiler` overrides default compiler for icon.

### Size parameters

If you do not specify any of size parameters, generated icon component will accept `width` and `height` properties,
which allow you to set size dynamically.

To set a fixed size, you can use `width`, `height` or `size` parameters:

You do not need to set multiple size properties, one is enough.
For example, if you set `height=1em`, width will be automatically calculated using icon's width/height ratio.

```js
// All examples are identical because icon is square
import BellIcon from '/~iconify/mdi-light/bell?height=1em';
import BellIcon from '/~iconify/mdi-light/bell?width=1em';
import BellIcon from '/~iconify/mdi-light/bell?size=1em';
```

If you set a size parameter, generated component will have hardcoded size and will no longer accept `width` and `height` properties.

That means, this will no longer work as expected:

```vue
<script setup>
import BellIcon from '/~iconify/mdi-light/bell?height=1em';
</script>
<template>
	<!-- Icon will have 1em height because it is set in import URL, property "height" is ignored -->
	<BellIcon height="2em" />
</template>
```

### Color

To change icon color, change text color.

You can do it in CSS, you can use inline style.

```vue
<script setup>
import BellIcon from '/~iconify/mdi-light/bell?size=1em';
</script>
<template>
	<BellIcon style="color: red;" />
</template>
```

## Issues

Possible issues:

### Cache warning

Plugin stores generated assets in cache in file system. By default, cache is stored in `node_modules/.iconify-unplugin`.

If for some reason that directory is not writable, you can set custom cache directory in `cacheDir` option in plugin.

## Licence

Iconify Unplugin package is licensed under MIT license.

`SPDX-License-Identifier: MIT`

© 2025-PRESENT Vjacheslav Trushkin

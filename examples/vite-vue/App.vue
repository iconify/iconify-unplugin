<script setup lang="ts">
import BellIcon from 'virtual:iconify/mdi-light/bell';
import BellIconFixedSize from 'virtual:iconify/mdi-light/bell?height=1.5em';
import bellIconRaw from '~iconify-raw/mdi-light/bell?height=1.5em';
</script>

<template>
	<main>
		<h1>Icons test</h1>
		<p>
			Vue component with fallback, height as prop:
			<BellIcon height="1.5em" />
		</p>
		<p>
			Vue component with fallback, 1.5em fixed height:
			<BellIconFixedSize />
		</p>
		<p>
			Raw SVG, 1.5em fixed height + code:
			<span v-html="bellIconRaw"></span>
		</p>
		<pre>{{ bellIconRaw }}</pre>
	</main>
</template>

<style>
p {
	font-size: 16px;
	line-height: 24px;
	color: #000;
}
p:hover {
	color: red;
}
</style>

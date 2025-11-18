<script>
import BellIcon from 'virtual:iconify/mdi-light/bell';
import BellIconFixedSize from 'virtual:iconify/mdi-light/bell?height=1.5em';
import bellIconRaw from '~iconify-raw/mdi-light/bell?height=1.5em';
</script>

<main>
	<h1>Icons test (vite-svelte)</h1>
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
		{@html bellIconRaw}
	</p>
	<pre>{ bellIconRaw }</pre>
</main>

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

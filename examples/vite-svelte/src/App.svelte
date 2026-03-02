<script>
import BellIcon from 'virtual:iconify/mdi-light/bell';
import BellIconFixedSize from 'virtual:iconify/mdi-light/bell?height=1.5em';
import bellIconRaw from '~iconify-raw/mdi-light/bell?height=1.5em';
import bellIconRaw2 from '~iconify-raw/mdi-light/bell?height=1.5em&mode=svg';
import AccountIcon from '~iconify/line-md/account';
import accountIconRaw from '~iconify-raw/line-md/account';
import accountIconSVGRaw from '~iconify-raw/line-md/account?mode=svg';
</script>

<main>
	<h1>Icons test (vite-svelte)</h1>
	<p>
		Svelte component with fallback, height as prop:
		<BellIcon height="1.5em" /> <AccountIcon height="1.5em" />
	</p>
	<p>
		Svelte component with fallback, 1.5em fixed height:
		<BellIconFixedSize />
	</p>
	<p>
		Raw SVG, 1.5em fixed height + code:
		{@html bellIconRaw}
	</p>
	<section>
		<h1>Icon code tests:</h1>
		<p>SVG+CSS:</p>
			<pre>{ bellIconRaw }</pre>
			<p>Full SVG:</p>
			<pre>{ bellIconRaw2 }</pre>
			<p>CSS animation:</p>
			<pre>{ accountIconRaw }</pre>
			<p>SVG animation:</p>
			<pre>{ accountIconSVGRaw }</pre>
	</section>
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
pre {
	white-space: pre-wrap;
}
</style>

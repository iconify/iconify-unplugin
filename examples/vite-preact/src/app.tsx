import BellIcon from 'virtual:iconify/mdi-light/bell';
import BellIconFixedSize from 'virtual:iconify/mdi-light/bell?height=1.5em';
import bellIconRaw from '~iconify-raw/mdi-light/bell?height=1.5em';

export function App() {
	return (
		<main>
			<h1>Icons test (vite-preact)</h1>
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
				<span dangerouslySetInnerHTML={{ __html: bellIconRaw }} />
			</p>
			<pre>{bellIconRaw}</pre>
		</main>
	);
}

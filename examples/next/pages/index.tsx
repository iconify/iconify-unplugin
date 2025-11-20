import type { NextPage } from 'next';
import BellIcon from '~iconify/mdi-light/bell';
import BellIconFixedSize from '~iconify/mdi-light/bell?height=1.5em';
import bellIconRaw from '~iconify-raw/mdi-light/bell?height=1.5em';

const Home: NextPage = () => {
	return (
		<main>
			<h1>Icons test (next)</h1>
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
};

export default Home;

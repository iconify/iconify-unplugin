import React from 'react';
import BellIcon from 'virtual:iconify/mdi-light/bell';
import BellIconFixedSize from 'virtual:iconify/mdi-light/bell?height=1.5em';
import bellIconRaw from '~iconify-raw/mdi-light/bell?height=1.5em';
import './App.css';

function App() {
	return (
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
				<span dangerouslySetInnerHTML={{ __html: bellIconRaw }} />
			</p>
			<pre>{bellIconRaw}</pre>
		</main>
	);
}

export default App;

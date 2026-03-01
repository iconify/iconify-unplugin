import { promises as fsPromises } from 'node:fs';

updatePackageJson()
	.then(() => console.log('package.json updated successfully'))
	.catch((err) => console.error('Error updating package.json:', err));

async function updatePackageJson() {
	const filename = './package.json';
	try {
		const contents = await fsPromises.readFile(filename, 'utf-8');
		const updatedContent = contents.replace('workspace:*', 'latest');
		await fsPromises.writeFile(filename, updatedContent);
	} catch (err) {
		console.error(err);
	}
}

import {
	getContentSlug,
	normalizeContentMetadata,
	type MdsvexMetadata
} from '$lib/content/metadata';

const contentRoot = '/src/content/blog';

export const load = async () => {
	const metadataModules = import.meta.glob<MdsvexMetadata>('/src/content/blog/**/*.md', {
		eager: true,
		import: 'metadata'
	});

	const posts = Object.entries(metadataModules)
		.map(([path, metadata]) =>
			normalizeContentMetadata('blog', getContentSlug(path, contentRoot), metadata)
		)
		.filter((post) => post.published !== false)
		.sort((a, b) => String(b.date).localeCompare(String(a.date)));

	return { posts };
};

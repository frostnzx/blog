import {
	getContentSlug,
	normalizeContentMetadata,
	type MdsvexMetadata
} from '$lib/content/metadata';

const contentRoot = '/src/content/notes';

export const load = async () => {
	const metadataModules = import.meta.glob<MdsvexMetadata>('/src/content/notes/**/*.md', {
		eager: true,
		import: 'metadata'
	});

	const notes = Object.entries(metadataModules)
		.map(([path, metadata]) =>
			normalizeContentMetadata('note', getContentSlug(path, contentRoot), metadata)
		)
		.filter((note) => note.published !== false)
		.sort((a, b) => String(b.date).localeCompare(String(a.date)));

	return { notes };
};

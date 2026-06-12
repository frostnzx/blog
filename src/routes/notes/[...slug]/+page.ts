import {
	getContentSlug,
	getMatchingContentPath,
	normalizeContentMetadata,
	type MdsvexMetadata
} from '$lib/content/metadata';
import { error } from '@sveltejs/kit';

const contentRoot = '/src/content/notes';

export const load = async ({ params }) => {
	const metadataModules = import.meta.glob<MdsvexMetadata>('/src/content/notes/**/*.md', {
		eager: true,
		import: 'metadata'
	});
	const matchedPath = getMatchingContentPath(metadataModules, contentRoot, params.slug);

	if (!matchedPath) {
		error(404, 'Note not found');
	}

	const slug = getContentSlug(matchedPath, contentRoot);

	return {
		contentPath: matchedPath,
		metadata: normalizeContentMetadata('note', slug, metadataModules[matchedPath])
	};
};

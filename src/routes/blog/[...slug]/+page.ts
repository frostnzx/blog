import {
	getContentSlug,
	getMatchingContentPath,
	normalizeContentMetadata,
	type MdsvexMetadata
} from '$lib/content/metadata';
import { error } from '@sveltejs/kit';

const contentRoot = '/src/content/blog';

export const load = async ({ params }) => {
	const metadataModules = import.meta.glob<MdsvexMetadata>('/src/content/blog/**/*.md', {
		eager: true,
		import: 'metadata'
	});
	const matchedPath = getMatchingContentPath(metadataModules, contentRoot, params.slug);

	if (!matchedPath) {
		error(404, 'Blog post not found');
	}

	const slug = getContentSlug(matchedPath, contentRoot);

	return {
		contentPath: matchedPath,
		metadata: normalizeContentMetadata('blog', slug, metadataModules[matchedPath])
	};
};

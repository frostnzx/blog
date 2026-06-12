import { getBlogMetadata, getBlogSlug, type BlogMetadata } from '$lib/blog/metadata';

export const load = async () => {
	const rawModules = import.meta.glob<string>('/src/content/blog/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const posts = Object.entries(rawModules)
		.map(([path, raw]) => {
			const slug = getBlogSlug(path);

			return {
				slug,
				...getBlogMetadata(slug, {} satisfies BlogMetadata, raw)
			};
		})
		.filter((post) => post.published !== false)
		.sort((a, b) => String(b.date).localeCompare(String(a.date)));

	return { posts };
};

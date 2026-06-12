import { getBlogMetadata, type BlogMetadata } from '$lib/blog/metadata';
import { getNoteBody, renderMarkdown } from '$lib/notes/markdown';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const rawModules = import.meta.glob<string>('/src/content/blog/**/*.md', {
		query: '?raw',
		import: 'default'
	});
	const assetModules = import.meta.glob<string>(
		'/src/content/blog/**/*.{avif,gif,jpeg,jpg,png,svg,webp}',
		{
			eager: true,
			query: '?url',
			import: 'default'
		}
	);

	const slug = params.slug;
	const matchPath = `/src/content/blog/${slug}.md`;
	const indexMatchPath = `/src/content/blog/${slug}/index.md`;
	const matchedPath = rawModules[matchPath] ? matchPath : indexMatchPath;
	const match = rawModules[matchedPath];

	if (!match) {
		error(404, 'Blog post not found');
	}

	const raw = await match();
	const assets = getBlogAssets(matchedPath, assetModules);

	return {
		html: renderMarkdown(getNoteBody(raw), {
			resolveAsset: (assetName) =>
				assets.get(assetName) ?? assets.get(decodeURIComponent(assetName))
		}),
		metadata: getBlogMetadata(slug, {} satisfies BlogMetadata, raw)
	};
};

const getBlogAssets = (matchedPath: string, assetModules: Record<string, string>) => {
	const postDirectory = matchedPath.slice(0, matchedPath.lastIndexOf('/'));
	const postRoot = postDirectory.endsWith('/assets')
		? postDirectory.slice(0, -'/assets'.length)
		: postDirectory;
	const assets = new Map<string, string>();

	for (const [path, url] of Object.entries(assetModules)) {
		if (!path.startsWith(`${postRoot}/`)) continue;

		const fileName = path.split('/').pop();
		if (!fileName) continue;

		const relativePath = path.slice(`${postRoot}/`.length);
		assets.set(fileName, url);
		assets.set(relativePath, url);
	}

	return assets;
};

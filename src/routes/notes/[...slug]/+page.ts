import { getNoteBody, renderMarkdown } from '$lib/notes/markdown';
import { getNoteMetadata, type NoteMetadata } from '$lib/notes/metadata';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const rawModules = import.meta.glob<string>('/src/content/notes/**/*.md', {
		query: '?raw',
		import: 'default'
	});
	const assetModules = import.meta.glob<string>(
		'/src/content/notes/**/*.{avif,gif,jpeg,jpg,png,svg,webp}',
		{
			eager: true,
			query: '?url',
			import: 'default'
		}
	);

	const slug = params.slug;
	const matchPath = `/src/content/notes/${slug}.md`;
	const indexMatchPath = `/src/content/notes/${slug}/index.md`;
	const matchedPath = rawModules[matchPath] ? matchPath : indexMatchPath;
	const match = rawModules[matchedPath];

	if (!match) {
		error(404, 'Note not found');
	}

	const raw = await match();
	const assets = getNoteAssets(matchedPath, assetModules);

	return {
		html: renderMarkdown(getNoteBody(raw), {
			resolveAsset: (assetName) =>
				assets.get(assetName) ?? assets.get(decodeURIComponent(assetName))
		}),
		metadata: getNoteMetadata(slug, {} satisfies NoteMetadata, raw)
	};
};

const getNoteAssets = (matchedPath: string, assetModules: Record<string, string>) => {
	const noteDirectory = matchedPath.slice(0, matchedPath.lastIndexOf('/'));
	const noteRoot = noteDirectory.endsWith('/assets')
		? noteDirectory.slice(0, -'/assets'.length)
		: noteDirectory;
	const assets = new Map<string, string>();

	for (const [path, url] of Object.entries(assetModules)) {
		if (!path.startsWith(`${noteRoot}/`)) continue;

		const fileName = path.split('/').pop();
		if (!fileName) continue;

		const relativePath = path.slice(`${noteRoot}/`.length);
		assets.set(fileName, url);
		assets.set(relativePath, url);
	}

	return assets;
};

import { getNoteMetadata, getNoteSlug, type NoteMetadata } from '$lib/notes/metadata';

export const load = async () => {
	const rawModules = import.meta.glob<string>('/src/content/notes/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const notes = Object.entries(rawModules)
		.map(([path, raw]) => {
			const slug = getNoteSlug(path);

			return {
				slug,
				...getNoteMetadata(slug, {} satisfies NoteMetadata, raw)
			};
		})
		.filter((note) => note.published !== false)
		.sort((a, b) => String(b.date).localeCompare(String(a.date)));

	return { notes };
};

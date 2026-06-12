import { formatNoteDate } from './date';

export type NoteMetadata = {
	title?: string;
	date?: string | Date;
	description?: string;
	published?: boolean;
	[key: string]: unknown;
};

export const getNoteSlug = (path: string) => {
	const slug = path.replace('/src/content/notes/', '').replace(/\.md$/, '');

	return slug.endsWith('/index') ? slug.slice(0, -'/index'.length) : slug;
};

export const getNoteUrl = (slug: string) =>
	`/notes/${slug.split('/').map(encodeURIComponent).join('/')}`;

export const getNoteTitleFromSlug = (slug: string) => {
	const filename = slug.split('/').pop() ?? slug;

	return filename.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
};

export const getNoteSectionFromSlug = (slug: string) => {
	const parts = slug.split('/');

	if (parts.length < 2) {
		return undefined;
	}

	return parts.slice(0, -1).join(' / ').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
};

export const getNoteMetadata = (slug: string, metadata: NoteMetadata, raw: string) => {
	const parsed = parsePlainMetadata(raw);
	const dateValue = metadata.date ?? parsed.date ?? '';
	const { date, dateLabel } = formatNoteDate(dateValue);

	return {
		...metadata,
		date,
		dateLabel,
		description: metadata.description,
		published: metadata.published ?? parsed.published,
		section: getNoteSectionFromSlug(slug),
		tags: normalizeTags(metadata.tags ?? parsed.tags),
		title: metadata.title ?? parsed.title ?? getNoteTitleFromSlug(slug),
		url: getNoteUrl(slug)
	};
};

const normalizeTags = (tags: unknown) => {
	if (Array.isArray(tags)) {
		return tags.map(String);
	}

	if (typeof tags === 'string') {
		return tags.split(/\s+/).filter(Boolean);
	}

	return [];
};

const parsePlainMetadata = (raw: string) => {
	const frontmatter = parseFrontmatter(raw);
	const lines = raw.split('\n').slice(0, 12);
	const title = lines
		.find((line) => line.startsWith('# '))
		?.replace(/^#\s+/, '')
		.trim();
	const date = lines
		.find((line) => /^date:\s*/i.test(line))
		?.replace(/^date:\s*/i, '')
		.trim();
	const tagLine = lines
		.find((line) => /^tags?:\s*/i.test(line))
		?.replace(/^tags?:\s*/i, '')
		.trim();

	return {
		date: frontmatter.date ?? date,
		description: frontmatter.description,
		published: frontmatter.published,
		tags: tagLine?.split(/\s+/).filter(Boolean),
		title: frontmatter.title ?? title
	};
};

const parseFrontmatter = (raw: string) => {
	if (!raw.startsWith('---\n')) {
		return {} as Partial<NoteMetadata>;
	}

	const end = raw.indexOf('\n---', 4);
	if (end === -1) {
		return {} as Partial<NoteMetadata>;
	}

	return raw
		.slice(4, end)
		.split('\n')
		.reduce<Partial<NoteMetadata>>((frontmatter, line) => {
			const match = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
			if (!match) return frontmatter;

			const [, key, rawValue] = match;
			const value = rawValue.trim();
			frontmatter[key] =
				value === 'true' ? true : value === 'false' ? false : value.replace(/^['"]|['"]$/g, '');

			return frontmatter;
		}, {});
};

import { formatNoteDate } from '$lib/notes/date';

export type BlogMetadata = {
	title?: string;
	date?: string | Date;
	description?: string;
	published?: boolean;
	tags?: string[] | string;
	[key: string]: unknown;
};

export const getBlogSlug = (path: string) => {
	const slug = path.replace('/src/content/blog/', '').replace(/\.md$/, '');

	return slug.endsWith('/index') ? slug.slice(0, -'/index'.length) : slug;
};

export const getBlogUrl = (slug: string) =>
	`/blog/${slug.split('/').map(encodeURIComponent).join('/')}`;

export const getBlogTitleFromSlug = (slug: string) => {
	const filename = slug.split('/').pop() ?? slug;

	return filename.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
};

export const getBlogMetadata = (slug: string, metadata: BlogMetadata, raw: string) => {
	const parsed = parsePlainMetadata(raw);
	const dateValue = metadata.date ?? parsed.date ?? '';
	const { date, dateLabel } = formatNoteDate(dateValue);

	return {
		...metadata,
		date,
		dateLabel,
		description: metadata.description ?? parsed.description,
		published: metadata.published ?? parsed.published,
		tags: normalizeTags(metadata.tags ?? parsed.tags),
		title: metadata.title ?? parsed.title ?? getBlogTitleFromSlug(slug),
		url: getBlogUrl(slug)
	};
};

const normalizeTags = (tags: unknown) => {
	if (Array.isArray(tags)) {
		return tags.map(String);
	}

	if (typeof tags === 'string') {
		return tags
			.split(/[,\s]+/)
			.map((tag) => tag.trim())
			.filter(Boolean);
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
	const description = lines
		.find((line) => /^description:\s*/i.test(line))
		?.replace(/^description:\s*/i, '')
		.trim();
	const tagLine = lines
		.find((line) => /^tags?:\s*/i.test(line))
		?.replace(/^tags?:\s*/i, '')
		.trim();

	return {
		date: frontmatter.date ?? date,
		description: frontmatter.description ?? description,
		published: frontmatter.published,
		tags: frontmatter.tags ?? tagLine,
		title: frontmatter.title ?? title
	};
};

const parseFrontmatter = (raw: string) => {
	if (!raw.startsWith('---\n')) {
		return {} as Partial<BlogMetadata>;
	}

	const end = raw.indexOf('\n---', 4);
	if (end === -1) {
		return {} as Partial<BlogMetadata>;
	}

	return raw
		.slice(4, end)
		.split('\n')
		.reduce<Partial<BlogMetadata>>((frontmatter, line) => {
			const match = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
			if (!match) return frontmatter;

			const [, key, rawValue] = match;
			const value = rawValue.trim();
			frontmatter[key] =
				value === 'true' ? true : value === 'false' ? false : value.replace(/^['"]|['"]$/g, '');

			return frontmatter;
		}, {});
};

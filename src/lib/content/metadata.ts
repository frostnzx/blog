import { formatNoteDate } from '$lib/notes/date';

export type ContentKind = 'blog' | 'note';

export type MdsvexMetadata = {
	title?: unknown;
	date?: unknown;
	description?: unknown;
	published?: unknown;
	kind?: unknown;
	course?: unknown;
	teacher?: unknown;
	tags?: unknown;
};

export type ContentMetadata = {
	slug: string;
	title: string;
	url: string;
	date: string;
	dateLabel: string;
	description?: string;
	published: boolean;
	kind: ContentKind;
	course?: string;
	teacher?: string;
	section?: string;
	tags: string[];
};

export const getContentSlug = (path: string, contentRoot: string) => {
	const slug = path.replace(contentRoot, '').replace(/\.md$/, '').replace(/^\//, '');

	return slug.endsWith('/index') ? slug.slice(0, -'/index'.length) : slug;
};

export const getContentUrl = (kind: ContentKind, slug: string) =>
	`/${kind === 'note' ? 'notes' : 'blog'}/${slug.split('/').map(encodeURIComponent).join('/')}`;

export const getContentTitleFromSlug = (slug: string) => {
	const filename = slug.split('/').pop() ?? slug;

	return filename.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
};

export const getContentSectionFromSlug = (slug: string) => {
	const parts = slug.split('/');

	if (parts.length < 2) {
		return undefined;
	}

	return parts.slice(0, -1).join(' / ').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
};

export const getMatchingContentPath = <T>(
	modules: Record<string, T>,
	contentRoot: string,
	slug: string
) => {
	const normalizedSlug = slug.replace(/\/$/, '');
	const matchPath = `${contentRoot}/${normalizedSlug}.md`;
	const indexMatchPath = `${contentRoot}/${normalizedSlug}/index.md`;

	return modules[matchPath] ? matchPath : modules[indexMatchPath] ? indexMatchPath : undefined;
};

export const normalizeContentMetadata = (
	kind: ContentKind,
	slug: string,
	metadata: MdsvexMetadata
): ContentMetadata => {
	const dateValue = typeof metadata.date === 'string' ? metadata.date : '';
	const { date, dateLabel } = formatNoteDate(dateValue);

	return {
		slug,
		title: toOptionalString(metadata.title) ?? getContentTitleFromSlug(slug),
		url: getContentUrl(kind, slug),
		date,
		dateLabel,
		description: toOptionalString(metadata.description),
		published: metadata.published !== false,
		kind,
		course: toOptionalString(metadata.course),
		teacher: toOptionalString(metadata.teacher),
		section: kind === 'note' ? getContentSectionFromSlug(slug) : undefined,
		tags: normalizeTags(metadata.tags)
	};
};

const normalizeTags = (tags: unknown) => {
	if (Array.isArray(tags)) {
		return tags.map(String).filter(Boolean);
	}

	if (typeof tags === 'string') {
		return tags
			.split(/[,\s]+/)
			.map((tag) => tag.trim())
			.filter(Boolean);
	}

	return [];
};

const toOptionalString = (value: unknown) => {
	if (typeof value !== 'string') {
		return undefined;
	}

	const trimmed = value.trim();

	return trimmed || undefined;
};

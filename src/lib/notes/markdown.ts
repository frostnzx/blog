export const getNoteBody = (raw: string) => {
	const withoutFrontmatter = raw.startsWith('---\n')
		? raw.slice(raw.indexOf('\n---', 4) + '\n---'.length)
		: raw;

	return withoutFrontmatter
		.split('\n')
		.filter((line, index) => index > 8 || !/^(date|tags?):\s*/i.test(line.trim()))
		.join('\n')
		.trim();
};

type RenderMarkdownOptions = {
	resolveAsset?: (assetName: string) => string | undefined;
};

export const renderMarkdown = (raw: string, options: RenderMarkdownOptions = {}) => {
	const lines = raw.replace(/\r\n/g, '\n').split('\n');
	const html: string[] = [];
	let paragraph: string[] = [];
	let list: string[] = [];
	let code: string[] = [];
	let inCode = false;

	const flushParagraph = () => {
		if (!paragraph.length) return;
		html.push(`<p>${formatInline(paragraph.join(' '), options)}</p>`);
		paragraph = [];
	};

	const flushList = () => {
		if (!list.length) return;
		html.push(`<ul>${list.map((item) => `<li>${formatInline(item, options)}</li>`).join('')}</ul>`);
		list = [];
	};

	const flushCode = () => {
		html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
		code = [];
	};

	for (const line of lines) {
		if (line.trim().startsWith('```')) {
			if (inCode) {
				flushCode();
				inCode = false;
			} else {
				flushParagraph();
				flushList();
				inCode = true;
			}
			continue;
		}

		if (inCode) {
			code.push(line);
			continue;
		}

		const trimmed = line.trim();

		if (!trimmed) {
			flushParagraph();
			flushList();
			continue;
		}

		if (/^---+$/.test(trimmed)) {
			flushParagraph();
			flushList();
			html.push('<hr>');
			continue;
		}

		const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
		if (heading) {
			flushParagraph();
			flushList();
			const level = heading[1].length;
			html.push(`<h${level}>${formatInline(heading[2], options)}</h${level}>`);
			continue;
		}

		const bullet = /^[-*]\s+(.+)$/.exec(trimmed);
		if (bullet) {
			flushParagraph();
			list.push(bullet[1]);
			continue;
		}

		flushList();
		paragraph.push(line);
	}

	flushParagraph();
	flushList();
	if (inCode) flushCode();

	return html.join('\n');
};

const formatInline = (value: string, options: RenderMarkdownOptions) =>
	escapeHtml(value)
		.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, assetName: string, alt?: string) =>
			renderImage(assetName, alt, options)
		)
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt: string, assetName: string) =>
			renderImage(assetName, alt, options)
		)
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(
			/\[([^\]]+)\]\(([^)]+)\)/g,
			(_, label: string, href: string) =>
				`<a href="${escapeAttribute(href)}" rel="noreferrer">${label}</a>`
		);

const renderImage = (
	assetName: string,
	alt: string | undefined,
	options: RenderMarkdownOptions
) => {
	const normalizedAssetName = assetName.trim();
	const src = options.resolveAsset?.(normalizedAssetName);
	const label = alt?.trim() || normalizedAssetName;

	if (!src) {
		return `<span class="note-asset">[image: ${escapeHtml(normalizedAssetName)}]</span>`;
	}

	return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(label)}" loading="lazy" decoding="async">`;
};

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const escapeAttribute = (value: string) =>
	escapeHtml(value).replace(/`/g, '&#96;').replace(/\s/g, '%20');

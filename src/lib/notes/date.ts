export const formatNoteDate = (date: string | Date) => {
	const parsed = parseNoteDate(date);

	if (!parsed) {
		const fallback = String(date);

		return {
			date: fallback,
			dateLabel: fallback
		};
	}

	const dateValue = parsed.toISOString().slice(0, 10);

	return {
		date: dateValue,
		dateLabel: new Intl.DateTimeFormat('en', {
			day: 'numeric',
			month: 'short',
			timeZone: 'UTC',
			year: 'numeric'
		}).format(parsed)
	};
};

const parseNoteDate = (date: string | Date) => {
	if (date instanceof Date) {
		return Number.isNaN(date.getTime()) ? undefined : date;
	}

	if (!date.trim()) {
		return undefined;
	}

	const plainDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

	if (plainDate) {
		const [, year, month, day] = plainDate;
		return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	}

	const parsed = new Date(date);

	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

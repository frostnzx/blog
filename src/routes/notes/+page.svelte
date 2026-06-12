<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="intro">
	<h2 class="font-extrabold">Notes</h2>
	<p>
		Academic notes I share with peers and anyone interested.<br />
		Some part may technically incorrect, so feel free to correct me. <br />
		Note that some parts of these notes are written in Thai.
	</p>
</section>

<section class="notes-grid" aria-label="All notes">
	{#each data.notes as note}
		<article class="note-listing">
			{#if note.date}
				<time datetime={note.date}>{note.dateLabel}</time>
			{/if}
			<a href={note.url}>{note.title}</a>
			<div class="note-details">
				{#if note.section}
					<span>{note.section}</span>
				{/if}
				{#if note.tags?.length}
					<span>{note.tags.join(' ')}</span>
				{/if}
			</div>
			{#if note.description}
				<p>{note.description}</p>
			{/if}
		</article>
	{/each}
</section>

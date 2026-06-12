<script lang="ts">
	import type { Component } from 'svelte';
	import type { PageProps } from './$types';

	const contentModules = import.meta.glob<Component>('/src/content/notes/**/*.md', {
		eager: true,
		import: 'default'
	});

	let { data }: PageProps = $props();
	const Content = $derived(contentModules[data.contentPath]);
</script>

<article class="note">
	<h1>{data.metadata.title}</h1>
	{#if data.metadata.date}
		<time datetime={data.metadata.date}>{data.metadata.dateLabel}</time>
	{/if}

	<div class="note-body">
		{#if Content}
			<Content />
		{/if}
	</div>
</article>

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<article class="note">
	<h1>{data.metadata.title}</h1>
	{#if data.metadata.date}
		<time datetime={data.metadata.date}>{data.metadata.dateLabel}</time>
	{/if}

	<div class="note-body">
		{@html data.html}
	</div>
</article>

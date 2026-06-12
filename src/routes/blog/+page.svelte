<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="intro">
	<h2 class="font-extrabold">Blog</h2>
	<p>
		Longer, more serious writing than my notes. Mostly for sharing knowledge, but sometimes about
		things unrelated to tech.
	</p>
</section>

<section class="notes-grid" aria-label="All blog posts">
	{#each data.posts as post}
		<article class="note-listing">
			{#if post.date}
				<time datetime={post.date}>{post.dateLabel}</time>
			{/if}
			<a href={post.url}>{post.title}</a>
			{#if post.tags?.length}
				<div class="note-details">
					<span>{post.tags.join(' ')}</span>
				</div>
			{/if}
			{#if post.description}
				<p>{post.description}</p>
			{/if}
		</article>
	{/each}
</section>

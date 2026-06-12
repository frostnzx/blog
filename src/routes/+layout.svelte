<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let currentDateTime = $state('');
	const isCurrent = (path: string) => page.url.pathname === path;

	onMount(() => {
		const updateDateTime = () => {
			currentDateTime = new Intl.DateTimeFormat(undefined, {
				dateStyle: 'full',
				timeStyle: 'medium'
			}).format(new Date());
		};

		updateDateTime();
		const timer = window.setInterval(updateDateTime, 1000);

		return () => window.clearInterval(timer);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="site-frame">
	<aside class="sidebar">
		<a href="/" class="site-title">frostnzx.github.io</a>

		<nav class="site-nav" aria-label="Main navigation">
			<a href="/" aria-current={isCurrent('/') ? 'page' : undefined}>home</a>
			<a href="/about" aria-current={isCurrent('/about') ? 'page' : undefined}>about this site</a>
			<a href="/projects" aria-current={isCurrent('/projects') ? 'page' : undefined}>projects</a>
			<a href="/resume" aria-current={isCurrent('/resume') ? 'page' : undefined}>resume</a>
			<a href="/notes" aria-current={isCurrent('/notes') ? 'page' : undefined}>notes</a>
			<a href="/blog" aria-current={isCurrent('/blog') ? 'page' : undefined}>blog</a>
			<a href="/contact" aria-current={isCurrent('/contact') ? 'page' : undefined}>contact</a>
		</nav>

		{#if currentDateTime}
			<p class="clock">{currentDateTime}</p>
		{/if}
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>

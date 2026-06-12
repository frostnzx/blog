<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let currentDateTime = $state('');
	const path = (route: string) => `${base}${route}`;
	const normalizePath = (route: string) => (route === '/' ? route : route.replace(/\/$/, ''));
	const isCurrent = (route: string) =>
		normalizePath(page.url.pathname) === normalizePath(path(route));

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
		<a href={path('/')} class="site-title">frostnzx.github.io</a>

		<nav class="site-nav" aria-label="Main navigation">
			<a href={path('/')} aria-current={isCurrent('/') ? 'page' : undefined}>home</a>
			<a href={path('/about')} aria-current={isCurrent('/about') ? 'page' : undefined}
				>about this site</a
			>
			<a href={path('/projects')} aria-current={isCurrent('/projects') ? 'page' : undefined}
				>projects</a
			>
			<a href={path('/resume')} aria-current={isCurrent('/resume') ? 'page' : undefined}>resume</a>
			<a href={path('/notes')} aria-current={isCurrent('/notes') ? 'page' : undefined}>notes</a>
			<a href={path('/blog')} aria-current={isCurrent('/blog') ? 'page' : undefined}>blog</a>
			<a href={path('/contact')} aria-current={isCurrent('/contact') ? 'page' : undefined}
				>contact</a
			>
		</nav>

		{#if currentDateTime}
			<p class="clock">{currentDateTime}</p>
		{/if}
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>

<svelte:head>
	<script
		type="module"
		src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
	></script>
</svelte:head>

<section class="intro">
	<p>Hi I'm Siwakorn Sriveerakul (gene).</p>
	<p><strong>Fullstack Engineer focused on backend.</strong></p>
	<p>
		Welcome to my personal site (^ム^). This is where I post interesting stuff or share my cool
		projects.
	</p>
	<p>Computer Engineering @Chula. Interests in web, systems, and infra.</p>
</section>

<section class="link-list" aria-labelledby="links-heading">
	<h1 id="links-heading">things</h1>

	<p>
		<a href="/resume">my resume</a>, currently open to part-time / freelance opportunities<br />
		<a href="https://github.com/frostnzx">my github</a>, planning to contribute to more open-source
		projects<br />
		<a href="https://www.linkedin.com/in/siwakornsri/">linkedin</a>, you can also contact me here
	</p>

	<p>
		Discord: fnzx<br />
		Email: <a href="mailto:frostnzx.work@gmail.com">frostnzx.work@gmail.com</a>
	</p>
</section>

<section class="home-columns" aria-label="Site sections">
	<div>
		<h2>features</h2>
		<article>
			<time datetime="2026-06-12">Jun 12, 2026</time>
			<a href="/notes">notes</a>
			<p>Mostly academic notes for my peers, written in Markdown.</p>
		</article>
		<article>
			<time datetime="2026-06-12">Jun 12, 2026</time>
			<a href="/projects">projects</a>
			<p>Things I built, broke, fixed, and kept around.</p>
		</article>
		<article>
			<time datetime="2026-06-12">Jun 12, 2026</time>
			<a href="/blog">blog</a>
			<p>Small notes on web, systems, infra, and things I’m figuring out.</p>
		</article>
	</div>

	<div>
		<h2>earth</h2>
		<model-viewer src="/models/earth.glb" alt="Earth" camera-controls></model-viewer>
		<p>pretty cool blue earth visual by ye (fka kanye west)</p>
	</div>
</section>

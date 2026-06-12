---
title: "Hello blog"
date: "2026-06-12"
description: "A tiny sample article to prove the blog pipeline works."
published: true
kind: "blog"
tags:
  - "sample"
  - "writing"
---

This is a sample article. It lives in its own folder:

```txt
src/content/blog/hello-blog/index.md
```

That folder can also contain images in an `assets/` directory, and the blog renderer will resolve local Markdown image links the same way notes do.

## Why this shape

- One folder per article keeps related files together.
- `/blog` can still list every article.
- `/blog/hello-blog` renders the full Markdown body.

Nice and boring. The good kind.

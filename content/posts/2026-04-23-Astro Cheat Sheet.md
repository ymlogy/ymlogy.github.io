---
title: "Astro Cheat Sheet"
date: 2026-04-23
draft: false
description: "A quick reference guide for the Astro JS framework"
tags: ["coding", "dev", "web development", "astro", "cheat sheet", "reference"]
categories: ["guides"]
---

# Astro

Astro is a modern web framework built for speed. It lets you ship less JavaScript by default, while still supporting your favorite UI frameworks when needed. This cheat sheet covers the essentials you’ll actually use day-to-day.

## Core Concept

Astro renders HTML on the server (or at build time) and only hydrates JavaScript where explicitly needed.

- Default: zero JavaScript sent to the browser
- Opt-in interactivity via “islands”
- Works with React, Vue, Svelte, Solid, etc.

Think: static-first, interactive-when-needed.

***

## File Structure

Basic Astro project layout:

- `/src/pages/` → routes (file-based routing)
- `/src/components/` → reusable components
- `/src/layouts/` → page wrappers
- `/public/` → static assets (served as-is)

Example:

- `src/pages/index.astro` → `/`
- `src/pages/blog/post.astro` → `/blog/post`

***

## Basic Astro Component

`.astro` files combine HTML + server-side logic.

```astro
---
const title = "Hello Astro";
---

<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

Key idea:

- Code inside `---` runs on the server
- Template below is HTML with JS expressions

***

## Props

Pass data into components:

**Component:**

```astro
---
const { title } = Astro.props;
---
<h1>{title}</h1>
```

**Usage:**

```astro
<MyComponent title="Hello World" />
```


***

## Layouts

Reusable page wrappers:

```astro
---
// src/layouts/BaseLayout.astro
const { title } = Astro.props;
---
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

Use it:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Home">
  <h1>Welcome</h1>
</BaseLayout>
```


***

## Routing

File-based routing:

- `about.astro` → `/about`
- `[slug].astro` → dynamic routes
- `index.astro` → root of folder

Dynamic example:

```astro
---
const { slug } = Astro.params;
---
<h1>{slug}</h1>
```


***

## Data Fetching

Runs at build time (or server-side if SSR enabled):

```astro
---
const res = await fetch('https://api.example.com/data');
const data = await res.json();
---
<ul>
  {data.map(item => <li>{item.name}</li>)}
</ul>
```


***

## Using Components from Frameworks

Import React/Vue/etc:

```astro
---
import Counter from '../components/Counter.jsx';
---
<Counter client:load />
```


***

## Hydration Directives (Critical)

Controls when JS loads:

- `client:load` → immediately
- `client:idle` → when browser is idle
- `client:visible` → when in viewport
- `client:media="(max-width: 768px)"` → based on media query
- `client:only="react"` → skip SSR entirely

Example:

```astro
<Counter client:visible />
```


***

## Styling

Options:

- Global CSS
- Scoped styles inside `.astro`
- Tailwind (popular with Astro)

Scoped example:

```astro
<style>
  h1 {
    color: red;
  }
</style>
```


***

## Slots

Pass content into components:

```astro
<MyLayout>
  <p>This goes into the slot</p>
</MyLayout>
```

Named slots:

```astro
<Layout>
  <h1 slot="header">Title</h1>
</Layout>
```


***

## Markdown Support

Astro supports `.md` and `.mdx`:

```md
---
title: My Post
---

# Hello Markdown
```

Use content collections for structured content.

***

## Environment Variables

```js
import.meta.env.PUBLIC_API_URL
```

- `PUBLIC_` prefix → exposed to browser
- others → server only

***

## Build \& Dev

- `npm run dev` → start dev server
- `npm run build` → static build
- `npm run preview` → preview production build

***

## When to Use Astro

Best for:

- Content-heavy sites (blogs, docs)
- Marketing pages
- Fast static sites
- Hybrid apps with selective interactivity

Less ideal for:

- Fully client-heavy SPAs (though still possible)

***

## Mental Model (Quick Recall)

- Astro = HTML-first
- JS = opt-in
- Components = server-rendered by default
- Interactivity = islands via hydration directives

***

---
name: seo-audit
description: Applies SEO best practices strictly for meta tags, accessibility, and content hierarchy.
---
# SEO Audit Skill

When rendering pages in React/Next.js:
1. **Metadata:** Ensure every page has a robust metadata export (Title, Description, OpenGraph tags, Twitter Cards).
2. **Semantic Elements:** Use `<main>`, `<section>`, `<article>`, `<nav>` appropriately.
3. **Heading Structure:** Strictly ONE `<h1>` tag per page. Follow logical progression (`<h2>`, then `<h3>`). Use Tailwind to visually alter size without breaking the semantic heading order.
4. **Alt Text & ARIA:** Provide descriptive `alt` for all `<Image>` tags. Keep contrast ratios high to pass accessibility checks.

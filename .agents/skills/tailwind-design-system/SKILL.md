---
name: tailwind-design-system
description: Creates scalable and highly-maintainable Tailwind CSS design systems.
---
# Tailwind Design System Skill

When bootstrapping a new Next.js / Tailwind project:
1. **Global Tokens:** Define strict color aliases in `tailwind.config.ts` (e.g., `primary`, `secondary`, `accent`, `surface`, `background`).
2. **Typography Scale:** Override the default font scales with mathematically harmonic custom variants if necessary. 
3. **Utility Abstractions:** Keep complex repeated patterns inside `@layer components` in `globals.css` (e.g., `.btn-primary`, `.glass-panel`).
4. **Responsive:** Use mobile-first prefixes consistently and logically (`sm:`, `md:`, `lg:`).

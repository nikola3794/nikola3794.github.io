# Styling / build notes

The site's CSS (`assets/styles.css`) is **compiled Tailwind**, generated from
`tailwind/input.css` + `tailwind/tailwind.config.js`.

## When do I need to rebuild?

- **Adding / editing a project** → **no rebuild.** Project cards reuse classes
  that are already compiled, and tag-pill colors are safelisted. Just edit
  `assets/projects.js` and refresh the page.
- **Changing the design** (new Tailwind utility classes in `index.html` /
  `assets/app.js`, or edits to `input.css` / `tailwind.config.js`) → **rebuild.**

## Rebuild command

Run from the project root:

```bash
npx tailwindcss@3.4.17 -c tailwind/tailwind.config.js -i tailwind/input.css -o assets/styles.css --minify
```

(Requires Node/npm; `npx` downloads the pinned Tailwind v3 CLI on first use.
This project is Tailwind **v3** — do not use v4, its config format differs.)

## What lives where

- `tailwind.config.js` — theme tokens (accent color, `max-w-content`, fonts),
  `content` globs (scanned for classes), and the tag-pill `safelist`.
- `input.css` — custom CSS that isn't expressible as utilities: the hero
  `.grid-bg` background, the `.nav-link` states, the project `.badge` styles,
  and the anchor `scroll-margin-top` offset for the fixed header.

# laraevrenos.github.io

Personal site of **Lara Evrenos**, a Senior Technical Recruiter and HR Business Partner in Berlin. It's a static, bilingual one-pager (EN `/`, TR `/tr/`) hosted on GitHub Pages, with no runtime dependencies and no frameworks.

## Edit → build → preview

```bash
# 1. Edit text in src/content.mjs (both languages live side by side)
# 2. Regenerate index.html, tr/index.html and sitemap.xml
npm run build
# 3. Preview locally at http://localhost:8080/ and http://localhost:8080/tr/
npm run serve
```

You need Node.js 18 or later. Nothing to install.

> `index.html`, `tr/index.html` and `sitemap.xml` are **generated files**. Commit them after every build, because GitHub Pages serves them as they are, and never edit them by hand.

## Structure

| Path | Purpose |
| --- | --- |
| `src/content.mjs` | All copy (EN + TR), experience, projects, role families, regions |
| `build.mjs` | Renders the pages, JSON-LD, hreflang and sitemap from `content.mjs` |
| `assets/css/style.css` | Design tokens (light/dark), layout, animations |
| `assets/js/main.js` | Interactions: network canvas, typewriter, Boolean terminal, pipeline, filters |
| `assets/fonts/woff2/` | Self-hosted Roboto Slab, subset to Latin and Turkish (GDPR-friendly, no Google Fonts calls) |
| `scripts/serve.mjs` | Local static server that behaves like GitHub Pages |
| `googleb36b9d488d10a72a.html` | Google Search Console ownership verification. **Do not delete.** |
| `flutter_service_worker.js` | Kill-switch that removes the old Flutter site's cache from returning visitors |

## SEO

- Separate EN and TR URLs with `hreflang` (`en`, `tr`, `x-default`), a canonical URL per page, and `og:locale` alternates
- JSON-LD `ProfilePage` + `Person` with `knowsLanguage` (EN/DE/TR/NL), `worksFor`, `alumniOf` and `hasOccupation`
- `sitemap.xml` with hreflang alternates, plus `robots.txt` that points to it
- Open Graph and Twitter card image at `assets/images/og-cover.png` (1200×630)

**After deploying:** in Google Search Console, verify the URL-prefix property `https://laraevrenos.github.io/` with the HTML-file method, submit `sitemap.xml`, and request indexing for `/` and `/tr/`.

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus styles, and live regions for filter and copy feedback
- `prefers-reduced-motion` turns off all motion, and the hero canvas pauses when it's off-screen or the tab is hidden
- No external requests at runtime

## Commit policy

Only the repository owner **laraevrenos** authors and pushes commits, with no co-author trailers. Local hooks in `.git/hooks/` enforce this.

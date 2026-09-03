# antipropaganda.net

A professional, bilingual author site for **Zlatko Anguelov** (Златко Ангелов), MD, MA — writer, medical journalist, editor, and memoirist. The site presents his books, essays, photographs, and documents as a durable public record of his life and work.

The visual language should be **professional, highlighted, and modern**: a quiet layout that lets photographs, book covers, and long-form text carry the emphasis, rather than decoration.

## Purpose

This is not a blog platform and not a CMS. It is a static author archive that visitors can browse without an account, a database, or a build step. It should:

- Introduce the author and his professional background (medicine, medical sociology, writing and editing).
- Feature published books, especially *Communism and the Remorse of an Innocent Victimizer* (Texas A&M University Press), later Bulgarian novels and essays, and related reviews.
- Host photographs and family/life documents as a visual biography.
- Present selected texts, endorsements, CVs, and PDF samples of medical and literary writing.
- Support English and Bulgarian content, matching the two later WordPress editions of the old site (`/en` and `/bg`).

Old content is incomplete. The Wayback Machine capture in `archive/` is a salvage pile, not a working site. The new site reconstructs a coherent public face from those fragments and from any material added later.

## Design principles

- **Professional.** Editorial typography, generous whitespace, restrained color. Treat books, portraits, and documents as the primary objects.
- **Highlight.** Featured work (memoir, later books, selected essays, key photographs) should be easy to find from the home page. Secondary material (CV, rates, old service pages, raw PDFs) lives one click deeper.
- **Modern.** Semantic HTML, responsive CSS, accessible navigation. No image maps, table layouts, or WordPress chrome from the recovered site.
- **Easy to extend.** A new page is an HTML file, a stylesheet rule, and an image or PDF in `assets/`. No compiler, package manager, or server runtime is required to add content.

## Technology

Vanilla **HTML**, **CSS**, and **JavaScript** only.

- No Java, no JVM, no servlets or JSP.
- No npm, bundlers, frameworks, or CSS preprocessors.
- No WordPress, PHP, or jQuery. The recovered `archive/en` and `archive/bg` WordPress trees are source material, not runtime.
- Pages are static files a browser can open locally or a simple HTTP server can host.

JavaScript, when used, should stay small and local: navigation, galleries, language toggle, and lightbox-style viewing of images. Prefer HTML and CSS when they are enough.

## Repository layout

```
.
├── index.html          # Site entry (home)
├── assets/
│   ├── styles.css      # Shared visual system
│   ├── img/            # Photographs, covers, and other images served by the new site
│   └── js/             # Optional vanilla scripts (add as needed)
├── archive/            # Read-only Wayback salvage of the previous site
└── README.md
```

Pages for books, photographs, essays, biography, and documents should sit at the repository root or in small topic folders (`books/`, `photos/`, `writing/`, `about/`) as the reconstruction grows. Keep URLs short and stable. Shared chrome (header, nav, footer) can be duplicated in HTML for now; if repetition becomes painful, a tiny include script is acceptable, a template engine is not.

`assets/` is the canonical media tree for the new site. Copy recovered images and PDFs here only after they have been checked: many Wayback files are stubs, truncated downloads, or WordPress internals that should not be published.

## Architecture of the new site

The site is a small set of linked documents with one visual system.

| Layer | Role |
| --- | --- |
| `index.html` | Home: author identity, featured books, and routes into the rest of the archive. |
| Topic pages | Biography, books, photographs, selected texts, professional writing, contact. |
| `assets/styles.css` | Type, color, spacing, layout, and component styles for every page. |
| `assets/img/` | Photographs, book covers, and other images. |
| Documents | PDFs (essays, CV, samples, reviews) linked from topic pages. |
| `archive/` | Evidence for reconstruction. Never linked from the public site. |

Suggested information architecture, drawn from what the old site actually contained:

1. **Home** — name, short statement, featured book and portrait.
2. **About** — biography, Proust questionnaire, CV.
3. **Books** — memoir, Bulgarian editions, *Erotic Memories*, *Love on Boogie Street*, other titles, endorsements.
4. **Writing** — literary essays, dialogues, poetry/translations, medical articles and PDFs.
5. **Photographs** — family, places, portraits; later English/Bulgarian gallery material where files exist.
6. **Documents** — CV, publication list, recommendation letters, scans that are worth keeping.
7. **Contact** — current public contact only; do not revive obsolete phone numbers or dead mailboxes without confirmation.

Bulgarian should be the default public language; English pages can mirror the same structure when recovered text is good enough to publish.

## The `archive/` folder

`archive/` is a Wayback Machine (by-the-way / wayback-style) download of earlier antipropaganda.net. It is **not** a workable copy of the old website. Captures mixed several generations of the site, and many files did not survive intact.

What is in it:

| Area | What it was | Typical problems |
| --- | --- | --- |
| Root HTML (`personal.html`, `bookpage.html`, `photos.html`, …) | Early 2000s personal/literary site (absolute positioning, red palette). | Missing images, image-map home page, incomplete copy. |
| Medical-writing pages (`medicalwriting.html`, `physicians.html`, `samples.html`, …) | Professional service pages (table layout, sliced JPEGs). | Dead ads, missing `home.jpg` / slice images, obsolete contact info. |
| `nonfiction/` | Duplicate of the literary pages. | Same gaps as the root HTML set. |
| `en/` | English WordPress 3.x site (“pages for people, books, and places”). | Theme/plugin JS, hashed filenames (`__q…`), pages that load remote URLs. |
| `bg/` | Bulgarian WordPress blog (Блогът на Златко Ангелов). | Same as `en/`, plus year/category/tag noise. |
| `allimages/`, `images/`, scattered JPEGs | Photographs, logos, flags, covers. | Mix of real photos and 114-byte stub files. |
| PDFs | Articles, CV, letters, book-related scans. | Some present; others linked from HTML but absent. |
| `js/`, `wp-includes/`, `wp-content/`, `cgi-sys/` | Old runtime. | Do not port. jQuery, NextGEN Gallery, Superfish, suspended-host pages. |

`archive/index.html` itself is a lander redirect, not the real home page. The literary navigation is easier to read in `archive/nonfiction/index.html`. Capture metadata lives in `archive/.downloaded.txt` and `archive/.cdx.json`.

Treat `archive/` as read-only source material. Do not restyle it in place. Do not serve it.

### How to stitch content

1. Identify a page or asset worth keeping (a book description, an endorsement, a photograph, a PDF).
2. Confirm the file is real: non-trivial size, opens as HTML/image/PDF, not a redirect stub.
3. Extract the text or copy the media into the new tree (`*.html` pages, `assets/img/`, or a documents folder).
4. Rewrite markup to the new layout and stylesheet. Drop inline styles, WordPress chrome, Google ads, and dead external scripts.
5. Note gaps (missing cover art, broken image names such as `bookpic.jpg`, absent audio like `PrairieLights.ram`) instead of inventing replacements.

The old site’s content was already incomplete before the capture. Reconstruction will be partial. Prefer a smaller, accurate site over a facsimile of every recovered URL.

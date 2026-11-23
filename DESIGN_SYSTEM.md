# Design system

The site is built from one stylesheet (`/assets/css/main.css`), compiled by Jekyll
from `_sass/`. Pages don't use inline styles. They use the components below.

Live reference: **/design-system/** (not indexed by search engines).

## Layers (`_sass/`)

| Folder        | What goes here                                                        |
| ------------- | --------------------------------------------------------------------- |
| `tokens/`     | Every design decision as Sass maps, emitted as CSS custom properties. |
| `tools/`      | Mixins only (`below("md")`, `label`, `display`, `card`, `lift`).      |
| `base/`       | Element defaults: reset, headings, links, focus.                      |
| `layout/`     | `.container`, `.section`, `.grid--2/3/4`, `.split`.                   |
| `components/` | Reusable UI, one file per family (see below).                         |
| `utilities/`  | Single-purpose helpers (`.mt-6`, `.list-reset`, `.visually-hidden`).  |

`assets/css/main.scss` just `@use`s these in order.

## Tokens

Change a value in `_sass/tokens/_index.scss` and it updates everywhere.

- Color: use the semantic roles `--color-text`, `--color-accent`, `--color-surface-subtle`
  and so on. The raw `$palette` exists only to feed those roles.
- Type: `--font-body | display | mono`, plus the fluid sizes `--size-display-xl … --size-text-2xs`.
- Spacing: `--space-1 … --space-24` (4px base). Sections use `--section-space`.
- Shape and depth: `--radius-*`, `--shadow-*`.
- Breakpoints: `sm` 600px and `md` 900px, available in Sass only (`@include tools.below("md")`).

## Components

| File          | Classes                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| `_text`       | `.eyebrow`, `.label`, `.lede`, `.meta`, `.gradient-text`, `.quote`, `.section-intro` |
| `_button`     | `.btn`, `.btn--outline`, `.btn--light`, `.actions`, `.text-link`               |
| `_chrome`     | `.logo`, `.site-header`, `.nav*`, `.site-footer*`, `.skip-link`                |
| `_hero`       | `.hero`, `.hero__portrait`, `.hero__tag`, `.page-hero`, `.badge`              |
| `_cards`      | `.card`, `.step`, `.panel`, `.check-list` (`--ticks`), `.timeline*`, `.note-card*`, `.pill`, `.testimonial*` |
| `_blocks`     | `.callout`, `.portrait`, `.avatar`, `.faq*`, `.booking`, `.article-card*`, `.chips`, `.author-box` |
| `_prose`      | `.prose` (`--full`) (Markdown content), `.comments-gate`, Rouge syntax colours, post hero image |
| `_breathing`  | `.breathing*` (box breathing timer), `.switch`                                 |

Class names follow BEM-ish rules: `.block`, `.block__part`, `.block--variant`.

## Templates

- `_layouts/default.html` is the shell: head, header, `<main>`, footer.
- `_layouts/page.html` renders a hero from front matter (`eyebrow`, `heading`,
  `heading_accent`, `lede`, `hero_actions`), then the content, then the CTA
  (turn the CTA off with `hide_cta: true`).
- `_layouts/post.html` is used by every post automatically, via `defaults` in `_config.yml`.
- Includes: `button.html`, `section-intro.html`, `cta.html`, `article-card.html`,
  `testimonial.html` (one quote by `id`), `testimonials.html` (full section).

## Content lives in `_data/`

- `navigation.yml`: header and footer links.
- `cta.yml`: the closing call-to-action copy.
- `coaching.yml`: steps, roadmap, topics and FAQ, shared by the home and program pages.
- `testimonials.yml`: client quotes, shown on the home, program and coaching call pages.
- `_config.yml`: `booking_url` (Calendly).

## Adding something new

1. Check `/design-system/` for a component that already fits.
2. If you need a new one, add it to the matching file in `_sass/components/`, built from tokens.
3. Add an example to `design-system.html`.

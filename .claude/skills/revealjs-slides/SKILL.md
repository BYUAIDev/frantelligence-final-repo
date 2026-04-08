---
name: revealjs-slides
description: >-
  Coaches building Reveal.js HTML decks with strong titles, sparse on-slide text,
  and verbal narrative carried in speaker notes. Use when authoring or editing
  reveal.js presentations, slide HTML/CSS, fragments, speaker view, or when the
  user wants projector-friendly slides with minimal bullet density.
---

# Reveal.js slide coaching

## Goal (non-negotiable)

Slides are **title-forward** and **low density**. Put **hooks** on the slide (short phrases, labels, one-line cues). Put **explanations, evidence, and stories** in the presenter’s mouth via **speaker notes** or rehearsal—not as paragraphs on the slide.

Extended background (plugins, a11y, build tools, CI patterns) lives in the repo’s [`Gemini-revealjs-notes.md`](../../../Gemini-revealjs-notes.md) if present; this skill stays operational.

---

## How Reveal.js works (agent mental model)

1. **DOM shell**: A root `<div class="reveal">` contains `<div class="slides">`. Each **horizontal** slide is a `<section>`. **Vertical** “stack” slides are nested `<section>` elements inside a parent `<section>`.
2. **Runtime**: After loading `reveal.js` (CDN or bundled), call `Reveal.initialize({ ... })` with options (`transition`, `hash`, `slideNumber`, `plugins`, `width`/`height`, etc.).
3. **Scaling**: The deck renders at a **fixed logical size** (common default ~960×700; projects may set e.g. 1280×720) and the framework **scales the whole stage** to fit the viewport. Design inside that box; avoid relying on arbitrary viewport CSS for core layout.
4. **Pacing**: Use **`fragment`** classes on elements for stepwise reveals. Use **`data-auto-animate`** (and matching **`data-id`**) between adjacent slides for smooth morphs when the same conceptual elements move or change.
5. **Content modes**: Slides can be plain HTML, or **Markdown** via the Markdown plugin (`data-markdown`, separators for horizontal/vertical splits). External `.md` requires a **local server** (not `file://`). Markdown is sensitive to **whitespace**; avoid mixing tabs/spaces carelessly.
6. **Speaker view**: The **Notes** plugin exposes `<aside class="notes">...</aside>`; open speaker view (typically **S** key) for timer + next slide + notes. **This is where “true detail” belongs** when the presenter needs a script.

---

## Slide design rules (match the user’s examples)

### Typography and hierarchy

- **Kicker / section label**: Small, uppercase, muted or accent color (e.g. “JOURNEY”, “Product”). One line.
- **Slide title**: Large, high contrast—often **one or two lines**. It should read well from the back of the room.
- **Body on slide**: **Minimal**. Prefer:
  - a **2×2 (or small) grid** of **single-line hooks** with distinct accent colors, or
  - **one** short supporting line / diagram caption, or
  - **one** strong visual (diagram, screenshot, SVG) with a **short** label.
- **Agenda / TOC pattern**: A vertical list of **panels**: number + **bold title** + **one** muted detail line per item (the detail is a **reminder**, not a mini-essay). Reveal **fragments** can reveal each row on click.

### What not to do

- Do not fill slides with paragraphs, dense bullets, or footnotes.
- Do not shrink font sizes to “fit” more text; **cut** or **move content to notes**.
- Do not duplicate the spoken script on the slide.

### Speaker notes convention

For every non-trivial slide, add:

```html
<aside class="notes">
  <p>Verbal script: key facts, transitions, timing cues.</p>
</aside>
```

Keep notes **honest** (factually aligned with what the presenter will say). Slides stay **true** at the level of labels and headlines; nuance lives in speech or notes.

---

## Technical checklist (when writing or editing a deck)

1. **Structure**: Valid `.reveal` → `.slides` → `<section>` tree; nested `<section>` only when vertical stacks are intentional.
2. **Init**: `Reveal.initialize({ plugins: [...] })` includes needed plugins (e.g. `RevealNotes`, `RevealHighlight`) if used.
3. **Headings**: Sensible `h1`–`h3` order per slide for screen readers.
4. **Images**: `alt` text on informative images; lazy-load heavy media with framework patterns (`data-src` / view distance) when decks grow large.
5. **Contrast**: Dark theme + accent colors: keep text readable (WCAG-minded contrast for titles and hooks).
6. **Layout helpers** (Reveal): Prefer built-ins where they fit—e.g. `.r-stretch` for media filling remaining height, `.r-fit-text` for single-line emphasis, `.r-stack` for layered + fragment reveals.
7. **CDN vs package paths**: Plugin script URLs must match the Reveal **version** and host layout (`plugin/...` on cdnjs vs `dist/plugin/...` in some npm layouts). Fix 404s before handing off.

---

## Minimal HTML skeleton (CDN-style)

```html
<div class="reveal">
  <div class="slides">
    <section>
      <h3>Kicker</h3>
      <h1>Strong title</h1>
      <div class="fragment"><p>One hook at a time</p></div>
      <aside class="notes"><p>Presenter detail here.</p></aside>
    </section>
  </div>
</div>
<script>
  Reveal.initialize({
    hash: true,
    plugins: [RevealNotes],
  });
</script>
```

Adapt theme CSS (`reveal.css` + `theme/black.css` or custom) and dimensions to the project.

---

## Reference implementation in this repo

For **dark theme**, **CSS variables**, **kicker + h1 + evolution grid**, and **Reveal.initialize** with `RevealHighlight` + `RevealNotes`, see [`knowledge-agent/Final presentation/index.html`](../../../knowledge-agent/Final%20presentation/index.html) when that file exists—mirror its patterns rather than inventing a conflicting system unless asked.

---

## Agent workflow

1. **Outline** the talk: slide sequence + **one headline** per slide + **what is spoken**.
2. **Mark up** slides: kicker, `h1`, sparse hooks or one visual; optional fragments for pacing.
3. **Add** `<aside class="notes">` for anything that would otherwise become a bullet wall.
4. **Verify** init, plugins, and that no slide requires reading more than a few seconds at a glance.

When the user asks for “more detail on the slide,” **default to speaker notes or a second (vertical) slide** before increasing on-slide density.

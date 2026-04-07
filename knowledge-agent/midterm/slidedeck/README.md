# Knowledge Builder Agent — Midterm Slide Deck

Built with [Reveal.js 4.6](https://revealjs.com/) · CDN-hosted · No install required

---

## How to open

**Right-click `index.html` → Open with Live Server** (VS Code)

That's it. Live Server handles the local HTTP serving Reveal.js expects.
Alternatively, double-clicking `index.html` in Chrome or Edge also works since all
content is inline — no external file fetching.

---

## How to edit content

1. Open `slides.md` — plain Markdown outline of every slide
2. Make your change there
3. Find the matching `<section>` in `index.html` (each one has a numbered comment like `<!-- 3 · KNOWLEDGE BUILDER AGENT -->`)
4. Update the HTML to match

To change colors or spacing, edit the CSS variables at the top of `index.html`:
```css
:root {
  --accent: #f59e0b;   /* amber */
  --green:  #4ade80;
  --red:    #f87171;
}
```

---

## Navigation

| Key | Action |
|---|---|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `F` | Fullscreen |
| `S` | Speaker notes |
| `Esc` | Slide overview |

---

## Slide map

| # | Title | Image | Rubric coverage |
|---|---|---|---|
| 1 | Title | CutesyPicture.png | — |
| 2 | What is Frantelligence? | EgyptianFranchise.png | Jason — System Understanding |
| 3 | Knowledge Builder Agent | MedievalFranchise.png | Jason — Problem Identification |
| 4 | The Problem | — | Jason — System Understanding |
| 5 | Who We're Building For | CutesyPicture.png | Jason — Customer Focus |
| 6 | Customer Conversations | — | Jason — Customer Interaction |
| 7 | Founding Hypothesis | — | Jason — Problem Identification |
| 8 | Falsification Test | FalsificationGrid.png | Jason — Falsifiability |
| 9 | Differentiation | DifferentiationChart.png | Jason — Competitive Analysis |
| 10 | System Architecture | ArchitectureDiagram.png | Jason — System Design |
| 11 | Technical Process (divider) | — | Casey — all |
| 12 | Development Pipeline | — | Casey — Doc-Driven Dev |
| 13 | Infrastructure | — | Casey — Logging & Scripts |
| 14 | MVP Roadmap | — | Casey — Phase-by-Phase |
| 15 | Success & Failure | — | Jason — Success Metrics |
| 16 | Closing | EgyptianFranchise + MedievalFranchise | — |

**16 slides · ~12 min · 3 min buffer for Q&A**

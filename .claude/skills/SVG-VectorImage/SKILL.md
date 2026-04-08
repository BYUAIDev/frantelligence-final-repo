# SKILL: High-Precision SVG & Vector Generation

## Overview
This skill provides the technical framework for an AI agent to generate production-grade SVG images. It specifically addresses the "seam" issue (anti-aliasing artifacts) and ensures the code is scalable, semantic, and easy to manipulate.

---

## 1. Technical Standards for "Gap-Free" Vectors
When shapes meet edge-to-edge, browsers often render a 1px "ghost line" between them. To prevent this, apply the following strategies:

### The Overlap Rule
* **Standard:** Never place shapes exactly at the same coordinate.
* **Execution:** Extend the "underlying" shape by `0.5` to `1.0` units.
* **Example:** If Box A ends at $x=50$, Box B should start at $x=49.5$ or Box A should end at $x=50.5$.

### Stroke Padding
* **Standard:** Use a "fringe" stroke to bridge gaps.
* **Execution:** Apply `stroke-width="0.5"` (or similar) using the same hex code as the `fill`. This ensures the anti-aliasing engine fills the sub-pixel gap with the shape's color.

### Global Shape Rendering
* **Standard:** Set rendering hints based on the art style.
* **Attribute:** `shape-rendering="geometricPrecision"` (for smooth curves) or `shape-rendering="crispEdges"` (for grid-based/pixel art to disable anti-aliasing entirely).

---

## 2. Structural Guidelines

### Responsive Architecture
* Always use `viewBox` (e.g., `viewBox="0 0 100 100"`) for internal coordinate systems.
* Set `width` and `height` to `100%` or omit them to allow the parent container to control scaling.

### Grouping and Semantics
* **`<g>` tags:** Group related elements (e.g., `<g id="head">`). 
* **Shared Styles:** Apply `fill`, `stroke`, and `opacity` to the group level rather than individual paths to reduce code bloat.
* **Nomenclature:** Use descriptive IDs for major layers to allow for CSS/JS targeting.

### Reusability (DRY Principle)
* Use `<defs>` and `<symbol>` for elements that appear more than once.
* Instantiate them with `<use xlink:href="#id" />`.

---

## 3. Pathing & Geometry
* **Primitive Preference:** Use `<rect>`, `<circle>`, and `<ellipse>` instead of `<path>` where possible. They are easier to modify and calculate.
* **Coordinate Precision:** Limit decimals to 2 places (e.g., `10.25` instead of `10.254892`).
* **Absolute vs. Relative:** Use absolute coordinates (`M, L, C`) for main anchor points and relative coordinates (`m, l, c`) for intricate details to make the shape "moveable" within the code.

---

## 4. Agent Execution Checklist
Before outputting SVG code, the agent must verify:
1. [ ] **No Gaps:** Do adjacent shapes have a `0.5` unit overlap or matching strokes?
2. [ ] **ViewBox:** Is the coordinate system clearly defined?
3. [ ] **Cleanliness:** Are there unnecessary tags (like `metadata` from Inkscape or Illustrator)?
4. [ ] **Accessibility:** Does the `<svg>` include a `<title>` and `<desc>` for screen readers?

---

## Example of a Perfect Join
```xml
<svg viewBox="0 0 200 100" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
  <title>Gap-Free Join Example</title>
  <rect width="200" height="100" fill="#f0f0f0" />
  
  <rect x="0" y="0" width="100.5" height="100" fill="#3498db" />
  
  <rect x="100" y="0" width="100" height="100" fill="#e74c3c" />
</svg>
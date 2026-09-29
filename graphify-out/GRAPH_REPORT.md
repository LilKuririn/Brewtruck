# Graph Report - beertruck  (2026-09-29)

## Corpus Check
- 16 files · ~83,175 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 63 nodes · 101 edges · 11 communities (7 shown, 4 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4131ef77`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Direction artistique (premium-artisanal, dark editorial)
- package.json
- Tasting.astro
- Component graph
- content.ts
- dependencies
- Quote.astro
- Story.astro
- scripts
- Hero.astro
- astro

## God Nodes (most connected - your core abstractions)
1. `Component graph` - 13 edges
2. `site` - 6 edges
3. `Navigation flow` - 6 edges
4. `Direction artistique (premium-artisanal, dark editorial)` - 5 edges
5. `scripts` - 4 edges
6. `Motivated motion (reduced-motion aware)` - 4 edges
7. `Single editable content source (content.ts)` - 4 edges
8. `styles/global.css design tokens` - 3 edges
9. `Hero glass fill animation` - 3 edges
10. `Typography` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Single editable content source (content.ts)` --references--> `site`  [INFERRED]
  docs/ARCHITECTURE.md → src/content.ts
- `Single editable content source (content.ts)` --references--> `taps`  [INFERRED]
  docs/ARCHITECTURE.md → src/content.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **BrewTruck visual identity system** — docs_architecture_palette_stout_ambre, docs_architecture_typography, docs_architecture_shapes, docs_architecture_motion [EXTRACTED 1.00]
- **Zero-JS native-first stack** — docs_architecture_no_js_framework, docs_architecture_popover_mobile_menu, docs_architecture_quote_form_progressive_enhancement, docs_architecture_motion [EXTRACTED 1.00]
- **Single sources of truth for content, style and conversion** — docs_architecture_single_content_source, docs_architecture_single_style_source, docs_architecture_single_conversion_intent [INFERRED 0.75]

## Communities (11 total, 4 thin omitted)

### Community 0 - "Direction artistique (premium-artisanal, dark editorial)"
Cohesion: 0.25
Nodes (9): Direction artistique (premium-artisanal, dark editorial), BrewTruck one-page static Astro site, Bricolage Grotesque (headings font), Hanken Grotesk (body font), Hero glass fill animation, Motivated motion (reduced-motion aware), Scroll-linked beer level gauge, Shapes (pill, 24px radius, trapezoid glass) (+1 more)

### Community 1 - "package.json"
Cohesion: 0.29
Nodes (6): name, private, type, @fontsource-variable/bricolage-grotesque, @fontsource-variable/hanken-grotesk, @phosphor-icons/core

### Community 4 - "content.ts"
Cohesion: 0.27
Nodes (8): Beer robe colors as data (blonde, ambree, brune), styles/global.css design tokens, Palette Stout & Ambre, Single editable content source (content.ts), Single style source (global.css tokens), site, taps, src_styles_global

### Community 5 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, astro, @fontsource-variable/bricolage-grotesque, @fontsource-variable/hanken-grotesk, @phosphor-icons/core

### Community 6 - "Quote.astro"
Cohesion: 0.33
Nodes (6): Navigation flow, No JS framework, CSS and native platform features, Native popover API mobile menu, Quote form progressive enhancement (mailto then fetch), Single conversion intent: Demander un devis, eventTypes

### Community 7 - "Story.astro"
Cohesion: 0.50
Nodes (3): assets/malt.jpg, src_assets_malt, steps

### Community 8 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

## Knowledge Gaps
- **21 isolated node(s):** `name`, `type`, `private`, `dev`, `build` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component graph` connect `Component graph` to `Direction artistique (premium-artisanal, dark editorial)`, `Tasting.astro`, `content.ts`, `Quote.astro`, `Story.astro`, `Hero.astro`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `Direction artistique (premium-artisanal, dark editorial)` connect `Direction artistique (premium-artisanal, dark editorial)` to `content.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `BrewTruck one-page static Astro site` connect `Direction artistique (premium-artisanal, dark editorial)` to `Component graph`, `Quote.astro`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `name`, `type`, `private` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
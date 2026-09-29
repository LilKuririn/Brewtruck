# Graph Report - beertruck  (2026-09-29)

## Corpus Check
- 20 files · ~76,371 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 64 nodes · 104 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.82)
- Token cost: 69,476 input · 0 output

## Community Hubs (Navigation)
- Direction artistique
- Configuration build
- Sections photo (assets)
- Composition de page
- Source de contenu
- Dépendances npm
- Conversion devis
- Natif sans framework
- Layout et tokens

## God Nodes (most connected - your core abstractions)
1. `Component graph` - 13 edges
2. `site` - 6 edges
3. `Navigation flow` - 6 edges
4. `Single editable content source (content.ts)` - 5 edges
5. `Direction artistique (premium-artisanal, dark editorial)` - 5 edges
6. `scripts` - 4 edges
7. `Motivated motion (reduced-motion aware)` - 4 edges
8. `credits` - 3 edges
9. `BrewTruck one-page static Astro site` - 3 edges
10. `styles/global.css design tokens` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Single editable content source (content.ts)` --references--> `taps`  [INFERRED]
  docs/ARCHITECTURE.md → src/content.ts
- `Single editable content source (content.ts)` --references--> `site`  [INFERRED]
  docs/ARCHITECTURE.md → src/content.ts
- `Single editable content source (content.ts)` --references--> `credits`  [INFERRED]
  docs/ARCHITECTURE.md → src/content.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Single sources of truth for content, style and conversion** — docs_architecture_single_content_source, docs_architecture_single_style_source, docs_architecture_single_conversion_intent [INFERRED 0.75]
- **Zero-JS native-first stack** — docs_architecture_no_js_framework, docs_architecture_popover_mobile_menu, docs_architecture_quote_form_progressive_enhancement, docs_architecture_motion [EXTRACTED 1.00]
- **BrewTruck visual identity system** — docs_architecture_palette_stout_ambre, docs_architecture_typography, docs_architecture_shapes, docs_architecture_motion [EXTRACTED 1.00]

## Communities (9 total, 2 thin omitted)

### Community 0 - "Direction artistique"
Cohesion: 0.16
Nodes (13): Direction artistique (premium-artisanal, dark editorial), Beer robe colors as data (blonde, ambree, brune), BrewTruck one-page static Astro site, Bricolage Grotesque (headings font), styles/global.css design tokens, Hanken Grotesk (body font), Hero glass fill animation, Motivated motion (reduced-motion aware) (+5 more)

### Community 1 - "Configuration build"
Cohesion: 0.15
Nodes (11): name, private, scripts, build, dev, preview, type, astro (+3 more)

### Community 2 - "Sections photo (assets)"
Cohesion: 0.18
Nodes (7): assets/foam.jpg, assets/hops.jpg, assets/malt.jpg, src_assets_foam, src_assets_hops, src_assets_malt, steps

### Community 4 - "Source de contenu"
Cohesion: 0.67
Nodes (4): Single editable content source (content.ts), credits, site, taps

### Community 5 - "Dépendances npm"
Cohesion: 0.40
Nodes (5): dependencies, astro, @fontsource-variable/bricolage-grotesque, @fontsource-variable/hanken-grotesk, @phosphor-icons/core

### Community 6 - "Conversion devis"
Cohesion: 0.67
Nodes (3): Navigation flow, Single conversion intent: Demander un devis, eventTypes

### Community 7 - "Natif sans framework"
Cohesion: 0.67
Nodes (3): No JS framework, CSS and native platform features, Native popover API mobile menu, Quote form progressive enhancement (mailto then fetch)

## Knowledge Gaps
- **21 isolated node(s):** `name`, `type`, `private`, `dev`, `build` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component graph` connect `Composition de page` to `Direction artistique`, `Sections photo (assets)`, `Source de contenu`, `Conversion devis`, `Layout et tokens`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `BrewTruck one-page static Astro site` connect `Direction artistique` to `Composition de page`, `Conversion devis`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Single editable content source (content.ts)` (e.g. with `Single style source (global.css tokens)` and `credits`) actually correct?**
  _`Single editable content source (content.ts)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `type`, `private` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
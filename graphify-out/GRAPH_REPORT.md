# Graph Report - beertruck  (2026-09-29)

## Corpus Check
- 20 files · ~87,009 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 79 nodes · 126 edges · 8 communities
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b01b3696`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Direction artistique (premium-artisanal, dark editorial)
- package.json
- beertruck-scene.ts
- Component graph
- Hero.astro
- dependencies
- No JS framework, CSS and native platform features
- Story.astro

## God Nodes (most connected - your core abstractions)
1. `Component graph` - 13 edges
2. `site` - 6 edges
3. `start()` - 6 edges
4. `Navigation flow` - 6 edges
5. `Direction artistique (premium-artisanal, dark editorial)` - 5 edges
6. `scripts` - 4 edges
7. `Motivated motion (reduced-motion aware)` - 4 edges
8. `Single editable content source (content.ts)` - 4 edges
9. `seeded()` - 3 edges
10. `cobbles()` - 3 edges

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

## Communities (8 total, 0 thin omitted)

### Community 0 - "Direction artistique (premium-artisanal, dark editorial)"
Cohesion: 0.17
Nodes (13): Direction artistique (premium-artisanal, dark editorial), Beer robe colors as data (blonde, ambree, brune), BrewTruck one-page static Astro site, Bricolage Grotesque (headings font), styles/global.css design tokens, Hanken Grotesk (body font), Hero glass fill animation, Motivated motion (reduced-motion aware) (+5 more)

### Community 1 - "package.json"
Cohesion: 0.12
Nodes (14): devDependencies, @types/three, name, private, scripts, build, dev, preview (+6 more)

### Community 2 - "beertruck-scene.ts"
Cohesion: 0.39
Nodes (7): three, buildTruck(), cobbles(), horizonFade(), seeded(), softDot(), start()

### Community 3 - "Component graph"
Cohesion: 0.26
Nodes (9): Component graph, Navigation flow, Single editable content source (content.ts), Single conversion intent: Demander un devis, events, eventTypes, site, taps (+1 more)

### Community 4 - "Hero.astro"
Cohesion: 0.40
Nodes (3): assets/foam.jpg, src_assets_foam, bubbles

### Community 5 - "dependencies"
Cohesion: 0.33
Nodes (6): dependencies, astro, @fontsource-variable/bricolage-grotesque, @fontsource-variable/hanken-grotesk, @phosphor-icons/core, three

### Community 6 - "No JS framework, CSS and native platform features"
Cohesion: 0.67
Nodes (3): No JS framework, CSS and native platform features, Native popover API mobile menu, Quote form progressive enhancement (mailto then fetch)

### Community 7 - "Story.astro"
Cohesion: 0.25
Nodes (5): assets/hops.jpg, assets/malt.jpg, src_assets_hops, src_assets_malt, steps

## Knowledge Gaps
- **25 isolated node(s):** `name`, `type`, `private`, `dev`, `build` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 30 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `three` connect `beertruck-scene.ts` to `package.json`?**
  _High betweenness centrality (0.410) - this node is a cross-community bridge._
- **Why does `Component graph` connect `Component graph` to `Direction artistique (premium-artisanal, dark editorial)`, `Hero.astro`, `Story.astro`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `name`, `type`, `private` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
# Graph Report - orrerylab  (2026-07-30)

## Corpus Check
- 26 files · ~4,980 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 134 nodes · 163 edges · 14 communities (7 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d51090dc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- OrbitalSystem.tsx
- layout.tsx
- compilerOptions
- package.json
- dependencies
- contact/page.tsx
- works.ts
- about/page.tsx
- Graphify Workflow
- eslint.config.mjs
- next.config.ts
- Official Website
- Orrery Logo
- Orrery Full Logo

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `works` - 6 edges
3. `scripts` - 6 edges
4. `useSound()` - 5 edges
5. `include` - 5 edges
6. `OrbitalSystem()` - 4 edges
7. `artists` - 4 edges
8. `lib` - 4 edges
9. `SoundToggle()` - 3 edges
10. `EntryExperience()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ArtistDetail()` --calls--> `getArtist()`  [EXTRACTED]
  app/artists/[slug]/page.tsx → content/artists.ts
- `ProjectPage()` --calls--> `getWork()`  [EXTRACTED]
  app/works/[slug]/page.tsx → content/works.ts
- `SoundToggle()` --calls--> `useSound()`  [EXTRACTED]
  components/audio/SoundToggle.tsx → components/audio/SoundProvider.tsx
- `EntryExperience()` --calls--> `useSound()`  [EXTRACTED]
  components/home/EntryExperience.tsx → components/audio/SoundProvider.tsx

## Import Cycles
- None detected.

## Communities (14 total, 7 thin omitted)

### Community 0 - "OrbitalSystem.tsx"
Cohesion: 0.16
Nodes (11): metadata, ArtistDetail(), OrbitalSystem(), Point, rotate(), artists, getArtist(), ArtistIdentity (+3 more)

### Community 1 - "layout.tsx"
Cohesion: 0.19
Nodes (9): metadata, SoundContext, SoundContextValue, SoundProvider(), useSound(), SoundToggle(), EntryExperience(), GlobalNavigation() (+1 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 3 - "package.json"
Cohesion: 0.12
Nodes (16): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, name (+8 more)

### Community 4 - "dependencies"
Cohesion: 0.13
Nodes (15): next, dependencies, next, react, react-dom, @types/node, @types/react, @types/react-dom (+7 more)

### Community 6 - "contact/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, ContactForm(), Fields, initial

### Community 7 - "works.ts"
Cohesion: 0.18
Nodes (9): metadata, ProjectPage(), AudioPreview(), labels, WorkArchive(), Work, getWork(), works (+1 more)

## Knowledge Gaps
- **64 isolated node(s):** `principles`, `metadata`, `metadata`, `metadata`, `metadata` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `works` connect `works.ts` to `OrbitalSystem.tsx`, `layout.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `principles`, `metadata`, `metadata` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
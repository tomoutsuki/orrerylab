# Graph Report - orrerylab  (2026-07-31)

## Corpus Check
- 26 files · ~5,031 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 134 nodes · 161 edges · 16 communities (9 shown, 7 thin omitted)
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
- include
- contact/page.tsx
- works/page.tsx
- about/page.tsx
- Graphify Workflow
- eslint.config.mjs
- next.config.ts
- Official Website
- Orrery Logo
- Orrery Full Logo
- works/[slug]/page.tsx

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
10. `getArtist()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ArtistDetail()` --calls--> `getArtist()`  [EXTRACTED]
  app/artists/[slug]/page.tsx → content/artists.ts
- `ProjectPage()` --calls--> `getWork()`  [EXTRACTED]
  app/works/[slug]/page.tsx → content/works.ts
- `EntryExperience()` --calls--> `useSound()`  [EXTRACTED]
  components/home/EntryExperience.tsx → components/audio/SoundProvider.tsx
- `SoundToggle()` --calls--> `useSound()`  [EXTRACTED]
  components/audio/SoundToggle.tsx → components/audio/SoundProvider.tsx

## Import Cycles
- None detected.

## Communities (16 total, 7 thin omitted)

### Community 0 - "OrbitalSystem.tsx"
Cohesion: 0.14
Nodes (13): metadata, ArtistDetail(), OrbitalSystem(), Point, rotate(), artists, getArtist(), ArtistIdentity (+5 more)

### Community 1 - "layout.tsx"
Cohesion: 0.22
Nodes (9): metadata, SoundContext, SoundContextValue, SoundProvider(), useSound(), SoundToggle(), EntryExperience(), GlobalNavigation() (+1 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "package.json"
Cohesion: 0.12
Nodes (16): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, name (+8 more)

### Community 4 - "dependencies"
Cohesion: 0.13
Nodes (15): next, dependencies, next, react, react-dom, @types/node, @types/react, @types/react-dom (+7 more)

### Community 5 - "include"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 6 - "contact/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, ContactForm(), Fields, initial

### Community 7 - "works/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, labels, WorkArchive(), Work

### Community 15 - "works/[slug]/page.tsx"
Cohesion: 0.47
Nodes (3): ProjectPage(), AudioPreview(), getWork()

## Knowledge Gaps
- **64 isolated node(s):** `principles`, `metadata`, `metadata`, `metadata`, `metadata` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `principles`, `metadata`, `metadata` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OrbitalSystem.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
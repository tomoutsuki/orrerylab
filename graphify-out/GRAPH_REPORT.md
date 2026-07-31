# Graph Report - .  (2026-07-30)

## Corpus Check
- Corpus is ~4,166 words - fits in a single context window. You may not need a graph.

## Summary
- 131 nodes · 158 edges · 15 communities (8 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Artists and Works
- Site Shell and Audio
- TypeScript Compiler Settings
- Linting and Build Scripts
- Framework Dependencies
- Type Declarations
- Contact Form
- Work Detail and Audio Preview
- About Page
- Graphify Workflow
- ESLint Compatibility
- Next.js Configuration
- Project Overview
- Orrery Logo
- Full Logo Asset

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useSound()` - 7 edges
3. `works` - 6 edges
4. `scripts` - 6 edges
5. `include` - 5 edges
6. `OrbitalSystem()` - 4 edges
7. `lib` - 4 edges
8. `SoundToggle()` - 3 edges
9. `EntryExperience()` - 3 edges
10. `artists` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ArtistDetail()` --calls--> `getArtist()`  [EXTRACTED]
  app/artists/[slug]/page.tsx → content/artists.ts
- `ProjectPage()` --calls--> `getWork()`  [EXTRACTED]
  app/works/[slug]/page.tsx → content/works.ts
- `SoundToggle()` --calls--> `useSound()`  [EXTRACTED]
  components/audio/SoundToggle.tsx → components/audio/SoundProvider.tsx
- `EntryExperience()` --calls--> `useSound()`  [EXTRACTED]
  components/home/EntryExperience.tsx → components/audio/SoundProvider.tsx
- `OrbitalSystem()` --calls--> `useSound()`  [EXTRACTED]
  components/orbital/OrbitalSystem.tsx → components/audio/SoundProvider.tsx

## Import Cycles
- None detected.

## Communities (15 total, 7 thin omitted)

### Community 0 - "Artists and Works"
Cohesion: 0.13
Nodes (14): metadata, ArtistDetail(), metadata, labels, WorkArchive(), artists, getArtist(), ArtistIdentity (+6 more)

### Community 1 - "Site Shell and Audio"
Cohesion: 0.17
Nodes (11): metadata, SoundContext, SoundContextValue, SoundProvider(), useSound(), SoundToggle(), EntryExperience(), GlobalNavigation() (+3 more)

### Community 2 - "TypeScript Compiler Settings"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Linting and Build Scripts"
Cohesion: 0.12
Nodes (16): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, name (+8 more)

### Community 4 - "Framework Dependencies"
Cohesion: 0.13
Nodes (15): next, dependencies, next, react, react-dom, @types/node, @types/react, @types/react-dom (+7 more)

### Community 5 - "Type Declarations"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 6 - "Contact Form"
Cohesion: 0.33
Nodes (4): metadata, ContactForm(), Fields, initial

### Community 7 - "Work Detail and Audio Preview"
Cohesion: 0.47
Nodes (3): ProjectPage(), AudioPreview(), getWork()

## Knowledge Gaps
- **64 isolated node(s):** `principles`, `metadata`, `metadata`, `metadata`, `metadata` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Framework Dependencies` to `Linting and Build Scripts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TypeScript Compiler Settings` to `Type Declarations`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `works` connect `Artists and Works` to `Site Shell and Audio`, `Work Detail and Audio Preview`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `principles`, `metadata`, `metadata` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Artists and Works` be split into smaller, more focused modules?**
  _Cohesion score 0.13405797101449277 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Settings` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Linting and Build Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
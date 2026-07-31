# Current architecture and modules

## Scope and architecture

Orrery Lab is a Next.js 15 application using React 19 and TypeScript. It uses the App Router and local TypeScript data modules; it has no CMS, database, API routes, authentication layer, or server-side form delivery.

The site is deliberately split into:

```text
app/          Routes, root layout, global styles, page composition
components/   Reusable interactive and presentational UI
content/      Typed, in-repository site, artist, and work data
public/       Files served from the site root
docs/         Product concepts and implementation documentation
```

`@/*` is a TypeScript path alias for the repository root. Components that use browser APIs, React state, canvas, audio, or event handlers begin with `"use client"`; route components are server components unless their dependencies require a client boundary.

## Request and rendering flow

```text
browser request
  → app/layout.tsx
      → global CSS, metadata, SoundProvider, global navigation, footer
  → route page
      → content module(s) and page-specific components
      → static detail params for known artist/work slugs
```

The root layout supplies the shared shell: metadata, the skip link, `SoundProvider`, `GlobalNavigation`, main landmark, and footer. The page routes compose content and components. Detail routes generate their parameters from the local `artists` and `works` arrays and call `notFound()` for an unknown slug.

## Routes currently implemented

| Route | Module | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home page: orbital artist interface, branch links, featured work, manifesto and collaboration call-to-action. |
| `/works` | `app/works/page.tsx` | Filterable work archive and reverse-chronological timeline. |
| `/works/[slug]` | `app/works/[slug]/page.tsx` | Statically generated work detail page. |
| `/artists` | `app/artists/page.tsx` | Artist-index panels with a compact orbital visual. |
| `/artists/[slug]` | `app/artists/[slug]/page.tsx` | Statically generated artist detail page and matching works. |
| `/about` | `app/about/page.tsx` | Studio method, manifesto and practical identity. |
| `/contact` | `app/contact/page.tsx` | Client-side validated contact-form demonstration. |

The concept sitemap also mentions Instruments, Notes, Privacy, Accessibility and language selection. They are not routes in the current application and should not be linked until implemented.

## Component map

### Shared shell and navigation

- `app/layout.tsx` owns the document shell and global metadata. It mounts `SoundProvider` above the header, main content and footer so navigation can access sound preference state.
- `components/navigation/GlobalNavigation.tsx` renders desktop navigation from `content/site.ts`, a responsive mobile menu, active-route states and the global `SoundToggle`.
- `app/globals.css` contains all tokens, layout, responsive rules, visual treatment and animation styles. There is no CSS module or utility framework.

### Home and orbital interaction

- `components/orbital/OrbitalSystem.tsx` is the main client-side visual system. It draws artist orbits on a canvas, calculates hit targets, slows an orbit on hover, optionally starts an artist preview, opens an artist dialog after a six-second hover, and navigates to an artist detail page on click.
- Its `PlayerJS` subcomponent manages a separate HTML audio element for the dialog player: play/pause, timeline and volume.
- The orbital canvas has an accessible `role="img"` and instruction label, but the rich hover-and-hold interaction is an enhancement; the standard Artists and Works routes remain the durable navigation path.
- `components/home/EntryExperience.tsx` contains an optional session-scoped entry overlay and a sound-enabled entry action. **It is not imported by the current layout or home page**, so it is inactive in the running site.

### Works, artists and contact

- `components/works/WorkArchive.tsx` filters the in-memory works list by type in the browser. It uses `aria-pressed` controls and an `aria-live` result region.
- `components/audio/AudioPreview.tsx` is a work-page boundary for future licensed previews. Work pages currently call it without `available`, so it renders only the no-autoplay pending message.
- `components/contact/ContactForm.tsx` owns form state and client-side required-field/email validation. A valid submission shows a local success state; it does not send data anywhere.

## Module dependency rules

- Route modules may import from `components/` and `content/`.
- Components read typed data through props or direct imports from `content/`; they do not call an API.
- `content/` must remain framework-independent: it exports values and types, not React components.
- Browser-only code belongs in a client component. Do not read `window`, `document`, storage, canvas or media APIs from a server component.
- Add a route only after adding its navigation and content ownership deliberately; the site’s global navigation is controlled by `content/site.ts`.

## Current implementation boundaries

- Project artwork is presently CSS-generated from `Work.artwork.mode`; it is not a managed image library.
- Artist and work records contain launch placeholders. The UI exposes this through copy and `placeholder` flags, but there is no draft/publish workflow.
- `site.email` is a placeholder (`hello@orrerylab.comm`) and is not displayed by the existing routes.
- No error, loading, not-found, privacy, accessibility, sitemap or robots route has been added.
- The root uses `lang="en"`; multilingual content and language switching are not implemented.

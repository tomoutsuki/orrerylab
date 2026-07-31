# Development and quality

## Technology and configuration

- **Framework:** Next.js 15.1.1 with the App Router.
- **UI:** React 19.0.0 and TypeScript 5.7.2 in strict mode.
- **Styling:** one global stylesheet, `app/globals.css`.
- **Quality tooling:** ESLint 9 with Next.js core-web-vitals and TypeScript rules.
- **Configuration:** `next.config.ts` enables AVIF and WebP output for the Next image pipeline; `tsconfig.json` defines the `@/*` alias.

The project does not currently include a test runner, component-test suite, end-to-end tests, formatter configuration, CI workflow or deployment configuration.

## Commands

Run these from the repository root:

```bash
npm run dev        # local development server
npm run lint       # ESLint
npm run typecheck  # TypeScript without emitting files
npm run build      # production build and static-route validation
npm run start      # serve a completed production build
```

Run `lint`, `typecheck` and `build` before handing off a substantive UI, content-type or route change. The production build is especially important because artist and work detail routes depend on generated static params.

## Accessibility implemented today

- semantic main and navigation landmarks;
- skip link to `#main-content`;
- visible `:focus-visible` styling;
- active-route `aria-current` indicators;
- responsive mobile navigation with focus moved to its first link when opened;
- pressed states for archive filters and sound preference;
- form labels, inline validation messages, `aria-invalid`, alert summary and success status;
- reduced-motion styling that removes several CSS animations and suppresses the unused entry overlay;
- canvas text alternative through `role="img"` and an accessible label.

## Accessibility work still needed

- The canvas orbit’s hover/hold behaviour is not a complete keyboard equivalent. Standard route links provide the basic alternative, but a keyboard-accessible in-canvas interaction or clearly adjacent controls would be stronger.
- The dialog created by `OrbitalSystem` has `aria-modal`, but no focus trap or restore-focus behaviour.
- `prefers-reduced-motion` prevents entry overlay/CSS animation but does not stop the canvas request-animation-frame loop.
- Final artwork, audio and video need their semantic markup and alternatives; the current CSS placeholders do not exercise this path.
- Add dedicated Accessibility and Privacy pages before public launch if they are part of the approved information architecture.

## Launch-critical gaps

1. Connect `ContactForm` to a server action, API route or approved form provider with spam protection, consent handling and an error/retry state.
2. Replace the placeholder email domain and confirm all public copy, credits, links and release claims.
3. Add final licensed media through the documented asset/audio workflow.
4. Make a deliberate audio policy: global interface preference, editorial music playback and multi-player coordination are currently separate.
5. Add privacy, accessibility, error/not-found and metadata/social-sharing coverage as needed for launch.
6. Establish image/audio performance budgets and test with real media on mobile networks.
7. Add automated coverage for route generation, content integrity, navigation, form submission and audio lifecycle before the catalogue expands.

## Documentation maintenance

Update these implementation documents in the same change whenever a route, content type, asset path convention, audio policy, deployment/runtime dependency or production integration changes. The concept documents should be updated when product intent changes; do not silently present planned capabilities as implemented ones.

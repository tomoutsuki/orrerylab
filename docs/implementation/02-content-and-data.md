# Content and data model

## Source of truth

All current editorial data lives in TypeScript under `content/`:

| Module | Owns |
| --- | --- |
| `content/site.ts` | Studio name, default description, placeholder email and global navigation entries. |
| `content/artists.ts` | Artist identities, editorial copy, orbit configuration, external links and optional audio paths. |
| `content/works.ts` | Work records, work type list and slug lookup. |
| `content/types.ts` | Shared TypeScript contracts for artists, works, credits, links and creative elements. |

This is a build-time, repository-managed catalogue. Changing one of these modules requires a rebuild/redeploy; there is no editorial interface or live content update path.

## Relationships

```text
ArtistIdentity ── name ──→ Work.artist
ArtistIdentity ── orbit.href ──→ /artists/[slug]
Work.slug ─────────────────────→ /works/[slug]
Work.featured ─────────────────→ home-page featured work
site.navigation ───────────────→ global navigation
```

The current artist-to-work relationship is a string-name match (`work.artist === artist.name`), used on artist pages and the artist index. Keep artist `name` values stable when editing records. If the catalogue grows, replace that coupling with an `artistSlug` reference before renaming identities.

## Current TypeScript contracts

`Work` describes the current UI, not the entire future concept model:

- identity and presentation: `slug`, `title`, optional `subtitle`, `year`, `type`, `artist`, `accent`;
- editorial content: `emotionalCentre`, `shortDescription`, optional `longDescription`, `creativeElements`, `credits`, `links`;
- visual state: `artwork` (`alt` and one of the CSS modes `iracema`, `amber`, `blue`);
- catalogue state: optional `featured`, `placeholder`, and `relatedWorks`.

`ArtistIdentity` holds `slug`, name and editorial copy, a visual mode, links, orbital geometry and optional audio paths:

```ts
audio?: { previewSrc?: string; src?: string }
```

`previewSrc` is used for the low-volume looping hover preview; `src` is preferred by the dialog player. Both must be browser-reachable URL paths to licensed media.

The more extensive future models—status, rich media, SEO, notes, instruments and explicit relationship references—are specified in [Content Models](../concepts/05-content-models.md). They are not currently represented in the runtime types.

## Adding or replacing a work

1. Add or update a typed record in `content/works.ts`.
2. Use a unique URL-safe `slug`; it automatically becomes a statically generated detail route.
3. Choose an existing `type` and `artwork.mode`, or update the union type, archive label map and CSS together.
4. Set `placeholder: false` only when copy, credits, artwork and external links are verified.
5. Use `featured: true` for exactly one record: the home page expects one and force-unwraps the result.
6. Add a corresponding managed visual/audio asset according to the asset and audio guides before exposing media.
7. Run typecheck, lint and build.

## Adding or editing an artist

1. Add the record to `content/artists.ts` and keep its `slug` within the `ArtistIdentity` slug union in `content/types.ts`.
2. Define a valid `/artists/[slug]` `orbit.href` and an orbit configuration suitable for the home canvas.
3. Keep `name` aligned with `Work.artist` values until the relationship model is migrated to slugs.
4. Add only verified external links and licensed audio URLs.
5. Confirm the artist appears in the orbital UI, artist index and generated detail route.

## Placeholder policy

The current three works are explicitly marked as launch placeholders. Placeholder material must be factual in its provisional status: do not present unverified release data, credits, cultural references, client information or media as final. The `Iracema` record also labels a research direction as pending verification.

Before publishing final work data, review at minimum:

- title, release/event context and date;
- artist attribution and complete credits;
- media rights and written asset metadata;
- external destinations;
- descriptions, especially cultural or instrumentation claims;
- accessibility alternatives for every newly introduced media item.

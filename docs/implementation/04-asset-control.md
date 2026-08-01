# Asset control

## Current inventory

The repository currently contains two supplied visual files and two artist audio files; it contains no raster-image or video files:

| File | Current role |
| --- | --- |
| `orrery_logo.svg` | Root-level SVG asset; it is not imported by the application. |
| `public/images/orrery_logo_full.svg` | Public SVG served at `/images/orrery_logo_full.svg`; it is not imported by the application. |
| `public/audio/Lichtgarten.ogg` | Keyaki source used by the artist hover preview and popup player. |
| `public/audio/Hatred.ogg` | Rei Tsukigaki source used by the artist hover preview and popup player. |

The visible navigation mark and work artwork are presently CSS-generated. `GlobalNavigation` draws the mark using `.brand-mark`; work cards and work pages use gradient-based CSS modes (`iracema`, `amber`, `blue`) from `Work.artwork.mode`. The configured `alt` text is content metadata but is not currently rendered because these artworks are decorative `div` elements rather than image elements.

## Asset delivery model

`public/` is the only public asset directory in the current application. A file at `public/images/example.svg` is addressed in code as `/images/example.svg`—never as `/public/images/example.svg`.

`next.config.ts` asks Next.js to serve optimized image formats (`avif` and `webp`) when Next’s image pipeline is used. No route currently imports `next/image`, so the setting has no effect on the existing CSS artwork or SVG files.

There is no asset manifest, upload service, image transformation service, checksum process or automatic licence validation. Asset control is currently a repository convention and release-review responsibility.

## Proposed directory convention

Use the following convention for new managed assets. It is compatible with the current public-path model and keeps editorial media out of component folders.

```text
public/
  images/
    brand/
    artists/<artist-slug>/
    works/<work-slug>/
  audio/
    artists/<artist-slug>/
    works/<work-slug>/
  video/
    works/<work-slug>/
  documents/
    works/<work-slug>/
```

Use lower-case, hyphenated names, for example `/images/works/iracema/cover-1600.webp` and `/audio/artists/keyaki/preview-01.mp3`. Avoid replacing an existing published filename with unrelated content; version a materially changed file or use a content-addressed deployment path.

## Required metadata and rights record

For every non-decorative media asset, store the following alongside its content record (and eventually in a formal asset manifest/CMS):

- owner or licence source, permission scope and expiry/review date;
- author/credit and required attribution text;
- source file location and exported public derivative path;
- work/artist relationship and intended placement;
- descriptive alt text, transcript/captions or non-media alternative as applicable;
- dimensions/duration, format and optimized delivery size;
- publication status and final approval owner.

The concept [Shared Media Reference](../concepts/05-content-models.md#9-shared-media-reference) defines the target field set for a future structured media model.

## Asset intake checklist

1. Confirm rights before copying media into `public/`.
2. Preserve the original master outside the web repository; commit only a purpose-built web derivative when appropriate.
3. Optimize images to modern web formats and size them to their rendered use. Use SVG for simple scalable brand art; do not use SVG as a container for unreviewed active content.
4. Compress preview audio, trim intentional start/end silence, and verify level consistency without damaging the master.
5. Add accessible alternatives and credits before wiring the public URL into content.
6. Validate the URL in a production build, inspect network payloads and test narrow/mobile layouts.
7. Record the asset in the content record and update the relevant documentation if the delivery policy changes.

## Using assets in the UI

- Use `next/image` for content imagery where responsive intrinsic sizing and optimization are useful. Provide `alt` text for meaningful imagery; use `alt=""` only for truly decorative images.
- Keep CSS artwork for intentional abstract placeholders, but replace it with semantic image markup when final artwork conveys information.
- Use native media elements or an accessible controlled player for audio/video. Media controls must not depend only on hover, canvas, colour or sound.
- Keep large media lazy-loaded or deferred until users request it. Do not introduce autoplay video or full-track autoplay.

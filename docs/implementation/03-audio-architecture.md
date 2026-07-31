# Audio architecture

## Current audio paths

Audio is divided into three independent paths. No released audio asset is currently present in the repository.

| Path | Module | Trigger and current behaviour |
| --- | --- | --- |
| Interface tone | `SoundProvider` | Creates a quiet Web Audio oscillator tone only when the saved sound preference is enabled and the document is visible. |
| Artist hover/dialog audio | `OrbitalSystem` | Uses native `Audio` from optional artist URLs: hover creates a looping, faded preview; the dialog creates a separate player. No source is configured today. |
| Work preview boundary | `AudioPreview` | Work pages render the unavailable state. The component’s available branch is visual only; it does not load or control an audio file. |

## Preference and consent

`SoundProvider` is mounted in `app/layout.tsx`. It initially disables sound, restores the `orrery-sound` preference from `localStorage` after hydration, and writes `on` or `off` when `SoundToggle` is pressed. `play()` exits when sound is disabled or the page is hidden.

The optional `EntryExperience` can enable sound and invoke the `enter` tone, but it is currently unused. Consequently, the visible sound toggle is the only active user interface for this preference, and enabling it alone does not play sound.

No full track autoplays. This follows the intended quiet, user-controlled sound principle.

## Artist audio flow

```text
content/artists.ts audio paths
  → OrbitalSystem hover: previewSrc, otherwise src
      → looped HTMLAudioElement, fade to 0.06 volume
  → Artist dialog PlayerJS: src, otherwise previewSrc
      → separate HTMLAudioElement with play/pause, seek and volume controls
```

On pointer exit, a new hover target, dialog opening, or component unmount, the hover preview is paused, reset to zero and released. The dialog player cleans up its own element on unmount/source change.

## Important current limitations

- The artist player does **not** consult `SoundProvider.enabled`. An artist media source can therefore play through explicit hover/click interaction even when the global interface-sound preference is off.
- Hover playback is initiated from pointer movement, so browsers may reject `Audio.play()` until a user gesture is accepted. The component safely ignores the rejected promise.
- The hover preview and dialog player are separate media elements. Opening a dialog stops the hover preview, but there is no global audio manager to coordinate media across all future players.
- `AudioPreview` has no `src`, duration, seek, pause or cleanup implementation. Do not pass `available={true}` as a release integration; replace it with a real player bound to verified media metadata.
- The current canvas interaction is mouse/pointer-oriented. Any production audio experience must retain accessible explicit play controls and text alternatives.

## Adding licensed artist audio

1. Obtain documented permission and the final delivery source. Do not commit informal, temporary or unlicensed files.
2. Place the optimized derivative in the public audio directory described in [Asset control](./04-asset-control.md), using a stable lower-case path.
3. Add `/audio/artists/<artist-slug>/<name>.mp3` (or equivalent) as `previewSrc` and/or `src` in `content/artists.ts`.
4. Verify hover start/stop, dialog playback, keyboard-accessible player controls, mobile behaviour and failure behaviour.
5. Add a transcript, listening description or equivalent contextual alternative where it is meaningful, plus credits and release links on the associated work/artist content.
6. Decide explicitly whether global sound preference should govern artist media, then implement that policy in one shared audio manager rather than duplicating checks.

## Recommended production direction

Before adding multiple tracks, consolidate audio ownership behind one provider/player manager that tracks the active element, pauses competing playback, exposes metadata and error state, and separates interface effects from editorial music. Keep interface effects opt-in; make editorial playback user-initiated and controllable with native, keyboard-accessible controls.

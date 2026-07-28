"use client";

/** A dedicated boundary for final licensed preview assets. */
export function AudioPreview({ available = false }: { available?: boolean }) {
  if (!available) return <section aria-label="Audio preview"><span className="eyebrow">Listen</span><p className="quiet">Audio preview will be introduced with the final licensed release material. No audio plays automatically.</p></section>;
  return <section aria-label="Audio preview"><span className="eyebrow">Listen</span><button className="sound-toggle" aria-label="Play audio preview">Play preview</button><p className="metadata">00:00 / 00:00</p></section>;
}

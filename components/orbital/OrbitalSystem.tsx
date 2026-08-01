"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { artists } from "@/content/artists";
import type { ArtistIdentity } from "@/content/types";

// A shared clock keeps every artist at the same 0.5 RPM angular speed.
const ORBIT_SPEED = Math.PI / 60;
const ORBIT_PRECESSION = ORBIT_SPEED * .12;
const HOVER_SPEED_MULTIPLIER = .05;
const SPEED_TRANSITION_MS = 800;
const HOLD_DURATION = 3000;
const PLANET_RADIUS = 12;
const HIT_RADIUS = PLANET_RADIUS * 3; // activation diameter is three planet diameters
const SUN_HIT_RADIUS = 36;
const HOVER_VOLUME = .22;
const POPUP_VOLUME = .7;

type Point = { x: number; y: number };
type PlanetMotion = { angle: number; multiplier: number; target: number; startMultiplier: number; transitionStartedAt: number };
type OrbitalTarget = { kind: "artist"; artist: ArtistIdentity } | { kind: "works" };

function rotate(point: Point, radians: number): Point {
  return { x: point.x * Math.cos(radians) - point.y * Math.sin(radians), y: point.x * Math.sin(radians) + point.y * Math.cos(radians) };
}

function PlayerJS({ artist, initialAudio }: { artist: ArtistIdentity; initialAudio: HTMLAudioElement | null }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(POPUP_VOLUME);
  const source = artist.audio?.src ?? artist.audio?.previewSrc;

  useEffect(() => {
    const node = initialAudio ?? (source ? new Audio(source) : null);
    if (!node) return;
    node.loop = false; audio.current = node;
    const update = () => setProgress(node.duration ? node.currentTime / node.duration : 0);
    const finish = () => setPlaying(false);
    node.addEventListener("timeupdate", update); node.addEventListener("ended", finish);
    update();
    if (node.paused) node.play().then(() => setPlaying(true)).catch(() => undefined); else setPlaying(true);
    const initialVolume = node.volume; const started = performance.now(); let frame = 0;
    const fade = () => { const progress = Math.min(1, (performance.now() - started) / 900); node.volume = initialVolume + (POPUP_VOLUME - initialVolume) * progress; if (progress < 1) frame = requestAnimationFrame(fade); };
    frame = requestAnimationFrame(fade);
    return () => { cancelAnimationFrame(frame); node.pause(); node.removeEventListener("timeupdate", update); node.removeEventListener("ended", finish); if (audio.current === node) audio.current = null; };
  }, [initialAudio, source]);
  const toggle = async () => { if (!audio.current) return; if (audio.current.paused) { await audio.current.play(); setPlaying(true); } else { audio.current.pause(); setPlaying(false); } };
  const seek = (next: number) => { if (audio.current?.duration) audio.current.currentTime = next * audio.current.duration; setProgress(next); };
  const changeVolume = (next: number) => { setVolume(next); if (audio.current) audio.current.volume = next; };

  return <div className="player-js" aria-label={`${artist.name} audio player`}>
    <button className="player-toggle" type="button" onClick={toggle} disabled={!source} aria-label={playing ? "Pause" : "Play"}>{playing ? "Ⅱ" : "▶"}</button>
    <div className="player-track"><div className="player-wave" aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <i key={index} style={{ height: `${22 + ((index * 19) % 63)}%` }} />)}</div><i className="player-playhead" aria-hidden="true" style={{ left: `${progress * 100}%` }}/><input aria-label="Track progress" type="range" min="0" max="1" step="0.001" value={progress} onChange={(event) => seek(Number(event.target.value))} disabled={!source}/></div>
    <label className="player-volume"><input aria-label="Volume" type="range" min="0" max="1" step=".01" value={volume} style={{ background: `linear-gradient(90deg, var(--brass-highlight) 0 ${volume * 100}%, var(--line) ${volume * 100}% 100%)` }} onChange={(event) => changeVolume(Number(event.target.value))} disabled={!source}/></label>
    {!source && <span className="player-pending">audio in orbit</span>}
  </div>;
}

function ArtistSystem({ artist, audio, onClose }: { artist: ArtistIdentity; audio: HTMLAudioElement | null; onClose: () => void }) {
  const [closing, setClosing] = useState(false);

  const close = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 360);
  };

  return <div className={`artist-system-backdrop ${closing ? "is-closing" : ""}`} role="presentation" onMouseDown={close}>
    <div className="popup-orbit-field" aria-hidden="true"><div className="artist-system-orbit orbit-a"/><div className="artist-system-orbit orbit-b"/><div className="artist-system-orbit orbit-c"/><i className="system-moon moon-a"/><i className="system-moon moon-b"/><i className="system-moon moon-c"/></div>
    <section className="artist-system" role="dialog" aria-modal="true" aria-label={`${artist.name} artist system`} onMouseDown={(event) => event.stopPropagation()}>
      <button className="artist-system-close popup-fade" type="button" onClick={close} aria-label="Close artist system">×</button>
      <div className="artist-system-core popup-fade"><span className="eyebrow">Artist in orbit</span><h2>{artist.name}</h2><p>{artist.statement}</p><PlayerJS artist={artist} initialAudio={audio}/></div>
    </section>
  </div>;
}

export function OrbitalSystem({ compact = false }: { compact?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const positions = useRef<(Point & { artist: ArtistIdentity })[]>([]);
  const audio = useRef<HTMLAudioElement | null>(null);
  const hover = useRef<{ artist: ArtistIdentity; start: number } | null>(null);
  const systemAngle = useRef(0);
  const planetMotion = useRef(new Map<string, PlanetMotion>());
  const lastFrame = useRef<number | null>(null);
  const [selected, setSelected] = useState<{ artist: ArtistIdentity; audio: HTMLAudioElement | null } | null>(null);
  const openingPopup = useRef(false);

  const stopPreview = useCallback(() => { if (audio.current) { audio.current.pause(); audio.current.currentTime = 0; audio.current = null; } }, []);
  const startPreview = useCallback((artist: ArtistIdentity) => {
    stopPreview(); const source = artist.audio?.previewSrc ?? artist.audio?.src;
    if (!source) return;
    const node = new Audio(source); node.volume = 0; node.loop = true; audio.current = node;
    node.play().catch(() => undefined);
    const started = performance.now(); const fade = () => { if (audio.current !== node) return; node.volume = Math.min(HOVER_VOLUME, ((performance.now() - started) / 1500) * HOVER_VOLUME); if (node.volume < HOVER_VOLUME) requestAnimationFrame(fade); }; requestAnimationFrame(fade);
  }, [stopPreview]);

  useEffect(() => stopPreview, [stopPreview]);

  useEffect(() => {
    const element = canvas.current; if (!element) return;
    const context = element.getContext("2d"); if (!context) return;
    let frame = 0; lastFrame.current = null;
    const draw = (now: number) => {
      const rect = element.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1;
      const width = Math.max(1, rect.width), height = Math.max(1, rect.height);
      const pixelWidth = Math.round(width * ratio), pixelHeight = Math.round(height * ratio);
      if (element.width !== pixelWidth || element.height !== pixelHeight) { element.width = pixelWidth; element.height = pixelHeight; }
      context.setTransform(ratio, 0, 0, ratio, 0, 0); context.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2, unit = Math.min(width, height);
      const elapsed = lastFrame.current === null ? 0 : Math.min((now - lastFrame.current) / 1000, .1);
      lastFrame.current = now;
      systemAngle.current += elapsed * ORBIT_SPEED;
      context.lineWidth = 1; positions.current = [];
      artists.forEach((artist, index) => {
        const targetMultiplier = hover.current?.artist.slug === artist.slug ? HOVER_SPEED_MULTIPLIER : 1;
        const motion = planetMotion.current.get(artist.slug) ?? { angle: 0, multiplier: 1, target: 1, startMultiplier: 1, transitionStartedAt: now };
        if (motion.target !== targetMultiplier) { motion.startMultiplier = motion.multiplier; motion.target = targetMultiplier; motion.transitionStartedAt = now; }
        const progress = Math.min(1, (now - motion.transitionStartedAt) / SPEED_TRANSITION_MS);
        const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        motion.multiplier = motion.startMultiplier + (motion.target - motion.startMultiplier) * eased;
        motion.angle += elapsed * ORBIT_SPEED * motion.multiplier;
        planetMotion.current.set(artist.slug, motion);
        const spec = artist.orbit; const rx = unit * spec.radius; const ry = rx * spec.eccentricity; const rotation = spec.angle * Math.PI / 180 + systemAngle.current * ORBIT_PRECESSION / ORBIT_SPEED;
        context.save(); context.translate(cx, cy); context.rotate(rotation); context.beginPath(); context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); context.strokeStyle = index % 2 ? "rgba(238,233,222,.16)" : "rgba(180,154,104,.44)"; context.stroke(); context.restore();
        const local = { x: rx * Math.cos(motion.angle + spec.phase * Math.PI * 2), y: ry * Math.sin(motion.angle + spec.phase * Math.PI * 2) };
        const rotated = rotate(local, rotation); const point = { x: cx + rotated.x, y: cy + rotated.y };
        positions.current.push({ ...point, artist }); const isHovering = hover.current?.artist.slug === artist.slug; const held = isHovering ? Math.min(1, (now - hover.current!.start) / HOLD_DURATION) : 0;
        const planetRadius = PLANET_RADIUS * (isHovering ? 1.1 : 1); // 1rem diameter, +10% on hover
        context.beginPath(); context.arc(point.x, point.y, planetRadius, 0, Math.PI * 2); context.fillStyle = "#10100f"; context.fill(); context.lineWidth = 1.5; context.strokeStyle = artist.orbit.color; context.stroke();
        if (isHovering) { context.beginPath(); context.arc(point.x, point.y, planetRadius + 5, -Math.PI / 2, -Math.PI / 2 + held * Math.PI * 2); context.strokeStyle = artist.orbit.color; context.lineWidth = 1.25; context.stroke(); }
        context.fillStyle = "rgba(238,233,222,.8)"; context.font = "13.5px Inter, ui-sans-serif, system-ui, sans-serif"; context.textAlign = "center"; context.textBaseline = "top"; context.fillText(artist.name, point.x, point.y + planetRadius + 10);
      });
      context.beginPath(); context.arc(cx, cy, 28, 0, Math.PI * 2); context.fillStyle = "#10100f"; context.fill(); context.strokeStyle = "#d1bc88"; context.lineWidth = 1.2; context.stroke(); context.beginPath(); context.arc(cx, cy, 2.5, 0, Math.PI * 2); context.fillStyle = "#d1bc88"; context.fill(); context.fillStyle = "rgba(238,233,222,.8)"; context.font = "13.5px Inter, ui-sans-serif, system-ui, sans-serif"; context.textAlign = "center"; context.textBaseline = "top"; context.fillText("Works", cx, cy + 38);
      if (hover.current && now - hover.current.start >= HOLD_DURATION && !compact) {
        const active = hover.current.artist;
        hover.current = null;
        openingPopup.current = true;
        setSelected({ artist: active, audio: audio.current });
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw); return () => cancelAnimationFrame(frame);
  }, [compact, stopPreview]);

  const targetAt = (clientX: number, clientY: number, element: HTMLCanvasElement): OrbitalTarget | null => {
    const rect = element.getBoundingClientRect(); const x = clientX - rect.left, y = clientY - rect.top;
    if (Math.hypot(x - rect.width / 2, y - rect.height / 2) <= SUN_HIT_RADIUS) return { kind: "works" };
    const artist = positions.current.find((point) => Math.hypot(point.x - x, point.y - y) <= HIT_RADIUS);
    return artist ? { kind: "artist", artist: artist.artist } : null;
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const target = targetAt(event.clientX, event.clientY, event.currentTarget);
    if (target?.kind === "artist" && hover.current?.artist.slug !== target.artist.slug) { hover.current = { artist: target.artist, start: performance.now() }; startPreview(target.artist); }
    if (target?.kind !== "artist" && hover.current) { hover.current = null; stopPreview(); }
    event.currentTarget.style.cursor = target ? "pointer" : "default";
  };
  const leave = () => { if (openingPopup.current) return; hover.current = null; stopPreview(); };
  const click = (event: React.MouseEvent<HTMLCanvasElement>) => { const target = targetAt(event.clientX, event.clientY, event.currentTarget); if (target?.kind === "works") window.location.assign("/works"); if (target?.kind === "artist") window.location.assign(target.artist.orbit.href); };

  return <><canvas ref={canvas} className="orbit-canvas" role="img" aria-label="Interactive artist orrery. Hover an artist planet to listen and hold for three seconds to open their system. Select Works at the centre to enter the archive." onPointerEnter={move} onPointerMove={move} onPointerLeave={leave} onMouseEnter={move} onMouseMove={move} onMouseLeave={leave} onClick={click}/>{selected && createPortal(<ArtistSystem artist={selected.artist} audio={selected.audio} onClose={() => { openingPopup.current = false; stopPreview(); setSelected(null); }}/>, document.body)}</>;
}

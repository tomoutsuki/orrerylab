"use client";
import { useSound } from "./SoundProvider";
export function SoundToggle() { const { enabled, setEnabled } = useSound(); return <button className="sound-toggle" aria-pressed={enabled} onClick={() => setEnabled(!enabled)}>{enabled ? "Sound on" : "Sound off"}</button>; }

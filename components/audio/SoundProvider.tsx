"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SoundContextValue = { enabled: boolean; setEnabled: (value: boolean) => void; play: (kind?: "focus" | "enter") => void };
const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  useEffect(() => { setEnabledState(localStorage.getItem("orrery-sound") === "on"); }, []);
  const setEnabled = (value: boolean) => { setEnabledState(value); localStorage.setItem("orrery-sound", value ? "on" : "off"); };
  const play = (kind = "focus") => {
    if (!enabled || document.hidden) return;
    // Intentional silence-safe placeholder: swap this tiny tone architecture for final licensed assets.
    const AudioContext = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.frequency.value = kind === "enter" ? 220 : 330; gain.gain.setValueAtTime(.012, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .16);
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .17); osc.onended = () => void ctx.close();
  };
  return <SoundContext.Provider value={{ enabled, setEnabled, play }}>{children}</SoundContext.Provider>;
}
export function useSound() { const context = useContext(SoundContext); if (!context) throw new Error("useSound must be used within SoundProvider"); return context; }

import { OrbitalSystem } from "@/components/orbital/OrbitalSystem";

export default function Home() {
  return <>
    <section className="section hero">
      <div className="hero-copy"><span className="eyebrow">Independent music & creative technology</span><h1 className="display hero-display" data-title="Worlds between genres">Worlds between genres</h1></div>
      <div className="orbital-wrap"><OrbitalSystem/></div>
    </section>
  </>;
}

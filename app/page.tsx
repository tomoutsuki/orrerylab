import Link from "next/link";
import { OrbitalSystem } from "@/components/orbital/OrbitalSystem";
import { works } from "@/content/works";

export default function Home() {
  const featured = works.find((work) => work.featured)!;
  return <>
    <section className="section hero">
      <div className="hero-copy"><span className="eyebrow">Independent music & creative technology</span><h1 className="display hero-display" data-title="Worlds between genres">Worlds between genres</h1></div>
      <div className="orbital-wrap"><OrbitalSystem/></div>
    </section>
    <section className="section">
      <span className="eyebrow">The system</span><h2 className="display medium">Distant ideas, held in relation.</h2>
      <div className="branch-grid">
        <Link href="/works"><span className="index">01</span><div><h3>Works</h3><p>Music created to remain after the moment has passed.</p></div></Link>
        <Link href="/artists"><span className="index">02</span><div><h3>Artists</h3><p>Distinct creative trajectories moving within the same universe.</p></div></Link>
        <Link href="/about"><span className="index">03</span><div><h3>About</h3><p>The belief and method holding the system together.</p></div></Link>
        <Link href="/contact"><span className="index">04</span><div><h3>Contact</h3><p>Bring a new world into Orrery.</p></div></Link>
      </div>
    </section>
    <section className="manifesto"><div className="section"><span className="eyebrow">A quiet proposition</span><h2 className="display medium">We create to remind people that beauty can still be found in this world.</h2><p className="lede">This is not a promise of perfection. It is an attention to the moments that still move through it: rhythm, memory, an image held a little longer than expected.</p></div></section>
    <section className="section featured">
      <div className={`artwork ${featured.artwork.mode}`}><span className="art-title">{featured.title}</span></div>
      <div><span className="eyebrow">Featured work · Placeholder</span><span className="metadata">{featured.type.replace("-", " ")} · {featured.artist}</span><h2 className="display medium">{featured.title}</h2><p className="lede">{featured.shortDescription}</p><p><em>{featured.emotionalCentre}</em></p><Link className="button secondary" href={`/works/${featured.slug}`}>Enter the work</Link></div>
    </section>
    <section className="section quote-section"><span className="eyebrow">What remains</span><h2 className="display medium">We create not only to be heard, but to remain.</h2><div className="activity-list"><article className="activity"><span className="metadata">Latest composition</span><strong>Iracema</strong><p className="quiet">An active placeholder composition study.</p></article><article className="activity"><span className="metadata">Current experiment</span><strong>Counterweight</strong><p className="quiet">Rhythmic structure, prototype stage.</p></article></div></section>
    <section className="section"><div className="cta-panel"><span className="eyebrow">Collaboration</span><h2 className="display medium">Bring a world into Orrery.</h2><p className="lede">We collaborate on music, rhythm games, interactive projects, experimental media and selected creative-technology work.</p><div className="button-row"><Link className="button" href="/contact">Start a conversation</Link><Link className="button secondary" href="/works">Explore the works</Link></div></div></section>
  </>;
}

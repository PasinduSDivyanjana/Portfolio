import { lazy, Suspense } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Github, Linkedin, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
import { useHeroMotion } from '../hooks/useHeroMotion';
const Atmosphere = lazy(() => import('../components/Atmosphere'));
export function HeroSection() {
  const motion = useHeroMotion();
  return (
    <section className="hero" id="home" {...motion}>
      <Suspense fallback={null}>
        <Atmosphere />
      </Suspense>
      <div className="hero-top">
        <span className="hello-tag">
          <span className="live-dot" /> A DEVELOPER WITH A CREATIVE MIND
        </span>
        <span className="hero-location">
          SRI LANKA <span>↗</span> WORLDWIDE
        </span>
      </div>
      <div className="hero-intro">
        <span className="intro-line" />
        <span>
          Good ideas deserve
          <br />a little <em>extraordinary.</em>
        </span>
      </div>
      <h1 className="hero-title">
        <span>Thoughtfully</span>
        <span className="title-outline">engineered.</span>
      </h1>
      <div className="character-wrap">
        <div className="character-aura" />
        <img
          className="hero-character"
          src={profile.character}
          alt="Stylized portrait of Pasindu Divyanjana"
          fetchPriority="high"
        />
        <span className="character-caption">
          PASINDU S DIVYANJANA<span>WEB & MOBILE DEVELOPER</span>
        </span>
      </div>
      <div className="hero-side-copy">
        <span className="small-cross">✳</span>
        <p>
          I bring ideas to life
          <br />
          through thoughtful code
          <br />
          and a curious mind.
        </p>
        <a href="#work">
          Explore my work <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="hero-highlights">
        <span className="floating-note note-one">
          <Code2 size={15} /> BUILT WITH PURPOSE
        </span>
        <span className="floating-note note-two">
          <Sparkles size={14} /> A LITTLE DIFFERENT.
        </span>
      </div>
      <div className="hero-footer">
        <a className="scroll-link" href="#about">
          <span>
            <ArrowDown size={17} />
          </span>{' '}
          SCROLL TO DISCOVER
        </a>
        <span className="hero-edition">PERSONAL PORTFOLIO — VOL. 02 / 2026</span>
        <div className="hero-socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href={profile.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

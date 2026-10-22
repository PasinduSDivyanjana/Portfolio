import { SectionHeading } from '../components/ui/SectionHeading';
import { useTilt } from '../hooks/useTilt';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
export function AboutSection() {
  const portraitMotion = useTilt<HTMLDivElement>(8);
  return (
    <section className="about section-shell" id="about">
      <SectionHeading
        number="01"
        label="A LITTLE INTRODUCTION"
        className="section-heading about-heading"
        artwork="about"
        title={
          <>
            Equal parts logic.
            <br />
            <span>Endless curiosity.</span>
          </>
        }
      />
      <div className="about-layout">
        <div className="portrait-block" data-reveal>
          <div className="portrait-frame" {...portraitMotion}>
            <img src={profile.portrait} alt="Pasindu S Divyanjana" loading="lazy" />
          </div>
          <span className="portrait-orbit">✳</span>
          <div className="portrait-label">
            <span>THE HUMAN BEHIND THE CODE</span>
            <span>← THAT’S ME</span>
          </div>
        </div>
        <div className="about-story" data-reveal>
          <span className="micro-label">HELLO, I’M PASINDU.</span>
          <h3>
            I make things work.
            <br />
            And make them <em>feel right.</em>
          </h3>
          <p>
            I’m a software engineering undergraduate at SLIIT, building websites and mobile apps
            that connect thoughtful design with practical technology.
          </p>
          <p>
            My work moves between storefronts, wellness apps, and logistics platforms. Different
            challenges, one shared goal: make everyday experiences simpler and more human.
          </p>
          <a className="inline-link" href={profile.linkedIn} target="_blank" rel="noreferrer">
            Get to know me <ArrowUpRight size={17} />
          </a>
          <div className="about-footnote">
            <span className="live-dot" />
            <span>Always learning. Always building.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

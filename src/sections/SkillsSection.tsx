import { SectionHeading } from '../components/ui/SectionHeading';
import { useState, type KeyboardEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionArtwork } from '../components/ui/SectionArtwork';
import { skillGroups, type SkillTab } from '../data/skills';
import { TechnologyLogo } from '../components/ui/TechnologyLogo';
const tabs = Object.keys(skillGroups) as SkillTab[];
export function SkillsSection() {
  const [skillTab, setSkillTab] = useState<SkillTab>(tabs[0]);
  const skillKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.indexOf(skillTab);
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    setSkillTab(tabs[next]);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus();
  };
  return (
    <section className="skills section-shell" id="skills">
      <SectionHeading
        number="03"
        label="TOOLS OF THE TRADE"
        title={
          <>
            The right tools.
            <br />
            <span>The right possibilities.</span>
          </>
        }
        description={
          <>
            Technology is the toolkit.
            <br />
            Curiosity is what connects it all.
          </>
        }
      />
      <div className="toolkit-layout">
        <div className="toolkit-orb">
          <SectionArtwork kind="skills" className="toolkit-artwork" technologyGroup={skillTab} />
          <span className="orb-tag">IDEA → CODE → EXPERIENCE</span>
        </div>
        <div className="toolkit-content">
          <div
            className="skill-tabs"
            role="tablist"
            aria-label="Technology categories"
            onKeyDown={skillKeys}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab}
                id={'skill-tab-' + i}
                role="tab"
                tabIndex={skillTab === tab ? 0 : -1}
                aria-selected={skillTab === tab}
                aria-controls="skill-panel"
                onClick={() => setSkillTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            className="skill-list"
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={'skill-tab-' + tabs.indexOf(skillTab)}
          >
            {skillGroups[skillTab].map((skill) => (
              <div className="skill" key={skill}>
                <span className="skill-symbol">
                  <TechnologyLogo name={skill} />
                </span>
                <span>{skill}</span>
                <ArrowUpRight size={14} />
              </div>
            ))}
          </div>
          <p className="toolkit-note">
            Building across the web, mobile, and everything in between.
          </p>
        </div>
      </div>
    </section>
  );
}

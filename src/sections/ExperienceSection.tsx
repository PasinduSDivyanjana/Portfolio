import { SectionHeading } from '../components/ui/SectionHeading';
import { useState } from 'react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { experience } from '../data/experience';
export function ExperienceSection() {
  const [journey, setJourney] = useState(0);
  return (
    <section className="journey section-shell" id="journey">
      <SectionHeading
        artwork="experience"
        number="04"
        label="PROFESSIONAL EXPERIENCE"
        title={
          <>
            Experience that
            <br />
            <span>puts ideas to work.</span>
          </>
        }
      />
      <div className="timeline">
        {experience.map((item, i) => (
          <article
            className={journey === i ? 'timeline-item expanded' : 'timeline-item'}
            key={item.id}
          >
            <span className="timeline-dot" />
            <button
              aria-expanded={journey === i}
              aria-controls={'journey-content-' + i}
              onClick={() => setJourney(journey === i ? -1 : i)}
            >
              <span className="timeline-tag">
                <span className={'company-logo company-logo-' + item.id}>
                  <img src={item.logo} alt="" width={64} height={64} loading="lazy" />
                </span>
                <span>{item.tag}</span>
              </span>
              <span className="timeline-title">
                <strong>{item.title}</strong>
                <span>{item.place}</span>
              </span>
              <span className="timeline-toggle">
                {journey === i ? <Minus size={19} /> : <Plus size={19} />}
              </span>
            </button>
            <div id={'journey-content-' + i} hidden={journey !== i}>
              <p className="timeline-period">{item.period}</p>
              {item.completion && <p className="timeline-completion">{item.completion}</p>}
              <p>{item.text}</p>
              {item.projectUrl && (
                <a className="inline-link" href={item.projectUrl} target="_blank" rel="noreferrer">
                  {item.projectLabel} <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

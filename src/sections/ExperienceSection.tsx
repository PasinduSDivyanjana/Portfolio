import { SectionHeading } from '../components/ui/SectionHeading';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { experience } from '../data/experience';
export function ExperienceSection() {
  const [journey, setJourney] = useState(0);
  return (
    <section className="journey section-shell" id="journey">
      <SectionHeading
        number="04"
        label="PROFESSIONAL EXPERIENCE"
        title={
          <>
            Experience that
            <br />
            <span>puts ideas to work.</span>
          </>
        }
        decoration={
          <span className="journey-asterisk" aria-hidden="true">
            ✳
          </span>
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
              <span className="timeline-tag">{item.tag}</span>
              <span className="timeline-title">
                <strong>{item.title}</strong>
                <span>{item.place}</span>
              </span>
              <span className="timeline-toggle">
                {journey === i ? <Minus size={19} /> : <Plus size={19} />}
              </span>
            </button>
            <div id={'journey-content-' + i} hidden={journey !== i}>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

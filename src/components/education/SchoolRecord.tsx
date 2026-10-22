import { Check, ChevronDown } from 'lucide-react';
import type { School } from '../../types/portfolio';
import { InstitutionLogo } from './InstitutionLogo';
import { ExamResults } from './ExamResults';
export function SchoolRecord({ school }: { school: School }) {
  const scholarship = school.scholarship;
  return (
    <article className={'school-record' + (scholarship ? ' primary-school' : '')} data-reveal>
      <div className="school-heading">
        <InstitutionLogo src={school.logo} alt={school.name + ' crest'} />
        <div>
          <span className="micro-label">{school.stage}</span>
          <h3>{school.name}</h3>
          <p>{school.city}</p>
        </div>
      </div>
      {school.qualifications.map((record) => (
        <details className="qualification" key={record.year} open={record.initiallyOpen}>
          <summary>
            <div>
              <span className="qualification-year">{record.year}</span>
              <h4>{record.title}</h4>
              <span className="qualification-stream">{record.summary}</span>
            </div>
            <ChevronDown size={17} />
          </summary>
          <ExamResults label={record.resultsLabel} entries={record.results} />
        </details>
      ))}
      {scholarship && (
        <div className="scholarship-record">
          <span className="qualification-year">{scholarship.year}</span>
          <h4>{scholarship.title}</h4>
          <div className="scholarship-score">
            <div>
              <span>SCORE</span>
              <strong>{scholarship.score}</strong>
            </div>
            <div>
              <span>CUT-OFF MARK</span>
              <strong>{scholarship.cutoff}</strong>
            </div>
          </div>
          {scholarship.score > scholarship.cutoff && (
            <p>
              <Check size={14} /> Above the cut-off mark
            </p>
          )}
        </div>
      )}
    </article>
  );
}

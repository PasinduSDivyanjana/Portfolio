import type { Qualification } from '../../types/portfolio';
export function ExamResults({
  entries,
  label,
}: {
  entries: Qualification['results'];
  label: string;
}) {
  return (
    <dl className="exam-results" aria-label={label}>
      {entries.map(([subject, grade]) => (
        <div key={subject}>
          <dt>{subject}</dt>
          <dd>{grade}</dd>
        </div>
      ))}
    </dl>
  );
}

import { Check } from 'lucide-react';
import type { Certificate } from '../../types/portfolio';
export function CourseStatus({ status }: { status: Certificate['status'] }) {
  const complete = status === 'Completed';
  return (
    <span className={'course-status ' + (complete ? 'complete' : 'in-progress')}>
      {complete ? <Check size={12} /> : <span className="course-status-dot" />}
      {status}
    </span>
  );
}

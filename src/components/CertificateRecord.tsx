import { BadgeCheck, BookOpen } from 'lucide-react';
import type { Certificate } from '../types/portfolio';
import { CourseStatus } from './ui/CourseStatus';
export function CertificateRecord({
  certificate,
  number,
}: {
  certificate: Certificate;
  number: number;
}) {
  const complete = certificate.status === 'Completed';
  return (
    <article className={'certificate-record ' + (complete ? 'completed' : 'ongoing')}>
      <span className="certificate-symbol">
        {complete ? (
          <BadgeCheck size={24} strokeWidth={1.4} />
        ) : (
          <BookOpen size={22} strokeWidth={1.4} />
        )}
      </span>
      <div className="certificate-description">
        <span className="certificate-number">
          {String(number).padStart(2, '0')} / {certificate.issuer}
        </span>
        <h4>{certificate.title}</h4>
      </div>
      <CourseStatus status={certificate.status} />
    </article>
  );
}

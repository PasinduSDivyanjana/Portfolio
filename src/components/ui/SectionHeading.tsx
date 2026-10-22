import type { ReactNode } from 'react';
import { SectionLabel } from './SectionLabel';
interface Props {
  number: string;
  label: string;
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
  decoration?: ReactNode;
  className?: string;
}
export function SectionHeading({
  number,
  label,
  title,
  titleId,
  description,
  decoration,
  className = 'section-heading',
}: Props) {
  return (
    <div className={className} data-reveal>
      <div>
        <SectionLabel number={number}>{label}</SectionLabel>
        <h2 id={titleId}>{title}</h2>
      </div>
      {description && <p>{description}</p>}
      {decoration}
    </div>
  );
}

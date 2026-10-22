import type { ReactNode } from 'react';
interface Props {
  number: string;
  children: ReactNode;
}
export function SectionLabel({ number, children }: Props) {
  return (
    <div className="section-label">
      <span>{number} /</span>
      {children}
    </div>
  );
}

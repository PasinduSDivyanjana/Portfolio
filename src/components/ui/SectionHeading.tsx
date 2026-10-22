import type { ReactNode } from 'react';
import { SectionLabel } from './SectionLabel';
import { SectionArtwork } from './SectionArtwork';
import type { SceneKind } from '../../types/scenes';
interface Props {
  number: string;
  label: string;
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
  decoration?: ReactNode;
  className?: string;
  artwork?: SceneKind;
  centerOnMobile?: boolean;
}
export function SectionHeading({
  number,
  label,
  title,
  titleId,
  description,
  decoration,
  className = 'section-heading',
  artwork,
  centerOnMobile = false,
}: Props) {
  return (
    <div
      className={
        className +
        (artwork ? ' section-heading-artwork' : centerOnMobile ? ' section-heading-centered' : '')
      }
      data-reveal
    >
      <div>
        <SectionLabel number={number}>{label}</SectionLabel>
        <h2 id={titleId}>{title}</h2>
      </div>
      {(description || decoration || artwork) && (
        <div className="heading-aside">
          {artwork && <SectionArtwork kind={artwork} />}
          {description && <p>{description}</p>}
          {decoration}
        </div>
      )}
    </div>
  );
}

import { Orbit } from 'lucide-react';
import type { SceneKind } from '../../types/scenes';

/** A viewport for the shared WebGL renderer. Content remains complete without WebGL. */
export function SectionArtwork({
  kind,
  className = '',
  technologyGroup,
}: {
  kind: SceneKind;
  className?: string;
  technologyGroup?: string;
}) {
  return (
    <div
      className={'section-artwork ' + className}
      data-scene={kind}
      data-technology-group={technologyGroup}
      aria-hidden="true"
    >
      <div className="artwork-halo" />
      <Orbit className="artwork-fallback" size={90} strokeWidth={0.7} />
      <span className="artwork-caption">
        {kind === 'awards'
          ? 'A MOMENT TO REMEMBER'
          : kind === 'education'
            ? 'ALWAYS A STUDENT'
            : 'IDEAS IN MOTION'}
      </span>
    </div>
  );
}

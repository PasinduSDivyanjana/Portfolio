import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/portfolio';
export function ProjectMockup({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <button
      className={'feature-stage ' + (project.preview.kind === 'phone' ? 'phone-stage' : '')}
      aria-label={'Explore ' + project.name}
      onClick={onSelect}
    >
      <span className="stage-grid" />
      <span className="stage-orbit" />
      <div className={project.preview.kind === 'phone' ? 'phone-mockup' : 'browser-mockup'}>
        {project.preview.kind === 'browser' && (
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>{project.preview.kind === 'browser' ? project.preview.hostname : null}</span>
            <ArrowUpRight size={10} />
          </div>
        )}
        {project.preview.kind === 'phone' && <div className="phone-island" />}
        <img
          src={'./Images/Projects/' + project.image}
          alt={project.name + ' website or app preview'}
          loading="lazy"
        />
      </div>
      <span className="stage-note">
        DESIGNED TO BE EXPERIENCED <ArrowUpRight size={15} />
      </span>
      <span className="stage-label">
        {project.preview.kind === 'phone' ? 'MOBILE EXPERIENCE' : 'DIGITAL EXPERIENCE'}
      </span>
    </button>
  );
}

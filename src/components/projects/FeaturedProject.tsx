import { ArrowUpRight } from 'lucide-react';
import { TechTags } from '../ui/TechTags';
import { ProjectMockup } from './ProjectMockup';
import type { Project } from '../../types/portfolio';
export function FeaturedProject({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <article className={'feature feature-' + project.color} data-reveal>
      <div className="feature-copy">
        <span className="project-number">
          {project.displayNumber}
          <span>/ {project.flagship ? 'FLAGSHIP PROJECT' : 'SELECTED PROJECT'}</span>
        </span>
        <span className="micro-label">{project.type}</span>
        <h3>{project.name}</h3>
        <p>{project.text}</p>
        <TechTags items={project.tech} />
        <button className="round-link" onClick={onSelect}>
          <span>{project.highlights ? 'Explore full project' : 'Explore project'}</span>
          <span>
            <ArrowUpRight size={20} />
          </span>
        </button>
      </div>
      <ProjectMockup project={project} onSelect={onSelect} />
    </article>
  );
}

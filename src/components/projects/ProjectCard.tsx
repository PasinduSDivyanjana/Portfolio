import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/portfolio';
export function ProjectCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <button className={'archive-project ' + project.color} onClick={onSelect}>
      <div className="archive-image">
        <img
          src={'./Images/Projects/' + project.image}
          alt={project.name + ' project'}
          loading="lazy"
        />
        <span>
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div>
        <h4>{project.name}</h4>
        <span>{project.type}</span>
      </div>
    </button>
  );
}

import { useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../types/portfolio';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectDialog } from '../components/projects/ProjectDialog';
import { SectionHeading } from '../components/ui/SectionHeading';

const projectFilters = ['All work', 'Web development', 'Mobile apps'] as const;
type Filter = (typeof projectFilters)[number];
export function WorkSection() {
  const [filter, setFilter] = useState<Filter>('All work');
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <>
      <section className="work section-shell" id="work">
        <SectionHeading
          number="02"
          label="SELECTED WORK"
          title={
            <>
              Less ordinary.
              <br />
              <span>More considered.</span>
            </>
          }
          description={
            <>
              Real projects. Real challenges.
              <br />A few things I’ve brought to life.
            </>
          }
        />
        <div className="featured-projects">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <FeaturedProject
                key={project.id}
                project={project}
                onSelect={() => setSelected(project)}
              />
            ))}
        </div>
        <div className="archive-heading">
          <h3>
            More from the workshop<span> / {String(projects.length).padStart(2, '0')}</span>
          </h3>
          <div className="project-filters" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                className={filter === f ? 'selected' : ''}
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'Web development' ? 'Web' : f === 'Mobile apps' ? 'Mobile' : f}
              </button>
            ))}
          </div>
        </div>
        <div className="archive-grid">
          {projects
            .filter((p) => filter === 'All work' || p.category === filter)
            .map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={() => setSelected(p)} />
            ))}
        </div>
      </section>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { TechTags } from '../ui/TechTags';
import { profile } from '../../data/profile';
import type { Project } from '../../types/portfolio';
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={project !== null}
      onClose={onClose}
      label="Project details"
      closeLabel="Close project"
      className="project-dialog"
    >
      {project && (
        <article>
          <img src={'./Images/Projects/' + project.image} alt={project.name + ' preview'} />
          <div className="dialog-content">
            <span className="micro-label">{project.type}</span>
            <h2>{project.name}</h2>
            <p>{project.text}</p>
            <TechTags items={project.tech} />
            {project.url ? (
              <a
                className="contact-button small"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                {new URL(project.url).hostname === 'github.com'
                  ? 'Explore source'
                  : 'Visit website'}
                <ArrowUpRight size={17} />
              </a>
            ) : (
              <a
                className="inline-link"
                href={
                  'mailto:' +
                  profile.email +
                  '?subject=' +
                  encodeURIComponent('Tell me about ' + project.name)
                }
              >
                Let’s talk about this project <ArrowRight size={17} />
              </a>
            )}
          </div>
        </article>
      )}
    </Modal>
  );
}

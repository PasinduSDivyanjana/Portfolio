import { ArrowRight, ArrowUpRight, Layers3, Monitor, Smartphone } from 'lucide-react';
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
      header={
        <>
          <span className="dialog-eyebrow">
            <Layers3 size={16} /> PROJECT SHOWCASE
          </span>
          {project && (
            <span className="dialog-project-number">{project.displayNumber} / SELECTED WORK</span>
          )}
        </>
      }
    >
      {project && (
        <article className={'project-overview project-overview-' + project.color}>
          <div className="dialog-visual">
            <div className="dialog-preview-frame">
              <div className="dialog-preview-bar" aria-hidden="true">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  {project.preview.kind === 'browser' ? project.preview.hostname : project.name}
                </span>
                {project.preview.kind === 'phone' ? (
                  <Smartphone size={13} />
                ) : (
                  <Monitor size={13} />
                )}
              </div>
              <img src={'./Images/Projects/' + project.image} alt={project.name + ' preview'} />
            </div>
            <div className="dialog-preview-caption">
              <span>BUILT WITH PURPOSE.</span>
              <span>
                {project.preview.kind === 'phone' ? 'MOBILE EXPERIENCE' : 'WEB EXPERIENCE'}
              </span>
            </div>
          </div>
          <div className="dialog-content">
            <span className="micro-label">{project.type}</span>
            <h2>{project.name}</h2>
            <p>{project.text}</p>
            <div className="dialog-technologies">
              <span className="dialog-detail-label">Built with</span>
              <TechTags items={project.tech} />
            </div>
            {project.url ? (
              <a
                className="project-dialog-link"
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
                className="project-dialog-link"
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

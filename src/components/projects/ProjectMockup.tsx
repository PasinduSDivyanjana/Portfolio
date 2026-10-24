import { useId, type CSSProperties } from 'react';
import { ArrowUpRight, MoveHorizontal, RotateCcw } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { useDeviceRotation } from '../../hooks/useDeviceRotation';
import { BrandMark } from '../ui/BrandMark';

export function ProjectMockup({ project, onSelect }: { project: Project; onSelect: () => void }) {
  const phone = project.preview.kind === 'phone';
  const helpId = useId();
  const { rotation, dragging, reset, controls } = useDeviceRotation({
    yaw: 0,
    pitch: 0,
  });
  const orientation = {
    '--device-yaw': `${rotation.yaw}deg`,
    '--device-pitch': `${rotation.pitch}deg`,
    ...(project.preview.kind === 'phone' && project.preview.screenAspectRatio
      ? { '--phone-screen-aspect': project.preview.screenAspectRatio }
      : {}),
  } as CSSProperties;

  return (
    <div className={'feature-stage ' + (phone ? 'phone-stage' : '')}>
      <span className="stage-grid" aria-hidden="true" />
      <span className="stage-orbit" aria-hidden="true" />
      <span className="stage-label">{phone ? 'MOBILE EXPERIENCE' : 'DIGITAL EXPERIENCE'}</span>
      <span className="rotation-badge" aria-hidden="true">
        360° VIEW
      </span>
      <div
        {...controls}
        className="device-interaction"
        role="group"
        aria-label={'Rotate ' + project.name + ' preview'}
        aria-describedby={helpId}
        tabIndex={0}
        data-dragging={dragging}
      >
        <div className="device-assembly">
          <div
            className={'device-model ' + (phone ? 'phone-mockup' : 'browser-mockup')}
            style={orientation}
          >
            <div className="device-face device-front">
              {project.preview.kind === 'browser' && (
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>{project.preview.hostname}</span>
                  <ArrowUpRight size={10} />
                </div>
              )}
              {project.preview.kind === 'phone' && project.preview.cameraCutout !== false && (
                <div className="phone-island" />
              )}
              <img
                src={'./Images/Projects/' + project.image}
                alt={project.name + ' website or app preview'}
                style={
                  project.preview.kind === 'phone'
                    ? { objectFit: project.preview.imageFit }
                    : undefined
                }
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="device-face device-back" aria-hidden="true">
              {phone ? (
                <div className="device-cameras">
                  <i />
                  <i />
                  <i />
                </div>
              ) : (
                <div className="device-vents" />
              )}
              <BrandMark />
              <span className="device-back-label">
                {phone ? 'MOBILE' : 'STUDIO'} / {project.name}
              </span>
            </div>
            <span className="device-edge device-edge-left" aria-hidden="true" />
            <span className="device-edge device-edge-right" aria-hidden="true" />
            <span className="device-edge device-edge-top" aria-hidden="true" />
            <span className="device-edge device-edge-bottom" aria-hidden="true" />
            {!phone && (
              <div className="monitor-stand" aria-hidden="true">
                <span />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="device-toolbar">
        <span className="rotation-hint" id={helpId}>
          <MoveHorizontal size={15} aria-hidden="true" /> Drag to rotate
          <span className="sr-only">
            . Swipe horizontally on touch. Use arrow keys to rotate and Home to reset.
          </span>
        </span>
        <div className="device-actions">
          <button
            type="button"
            onClick={reset}
            aria-label={'Reset ' + project.name + ' view'}
            title="Reset view"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
          <button type="button" onClick={onSelect} aria-label={'Explore ' + project.name}>
            <span>Explore</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

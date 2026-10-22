import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectMockup } from '../components/projects/ProjectMockup';
import { projects } from '../data/projects';

// jsdom lacks PointerEvent and pointer capture; model their browser contracts for gesture tests.
function pointer(element: HTMLElement, type: string, x: number, y: number, touch = false, id = 1) {
  const event = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y, button: 0 });
  Object.defineProperties(event, {
    pointerId: { value: id },
    pointerType: { value: touch ? 'touch' : 'mouse' },
    isPrimary: { value: id === 1 },
  });
  fireEvent(element, event);
}

function setup(phone = false) {
  const project = projects.find((item) => item.preview.kind === (phone ? 'phone' : 'browser'))!;
  const onSelect = vi.fn();
  render(<ProjectMockup project={project} onSelect={onSelect} />);
  const surface = screen.getByRole('group', { name: `Rotate ${project.name} preview` });
  const model = surface.querySelector<HTMLElement>('.device-model')!;
  return { project, surface, model, onSelect };
}

beforeEach(() => {
  HTMLElement.prototype.setPointerCapture = vi.fn();
  HTMLElement.prototype.hasPointerCapture = vi.fn(() => true);
  HTMLElement.prototype.releasePointerCapture = vi.fn();
});

describe('interactive device previews', () => {
  it.each([false, true])(
    'rotates a %s phone presentation beyond 360 degrees without opening details',
    (phone) => {
      const { surface, model, onSelect } = setup(phone);
      pointer(surface, 'pointerdown', 0, 100);
      pointer(surface, 'pointermove', 600, 0);
      expect(model.style.getPropertyValue('--device-yaw')).toBe('420deg');
      expect(surface).toHaveAttribute('data-dragging', 'true');
      pointer(surface, 'pointerup', 600, 0);
      expect(surface).toHaveAttribute('data-dragging', 'false');
      expect(surface.releasePointerCapture).toHaveBeenCalledWith(1);
      expect(onSelect).not.toHaveBeenCalled();
      pointer(surface, 'pointermove', 800, 0);
      expect(model.style.getPropertyValue('--device-yaw')).toBe('420deg');
      expect(surface.querySelector('.device-back')).toBeInTheDocument();
      expect(surface.querySelectorAll('.device-edge')).toHaveLength(4);
    },
  );

  it('keeps touch scrolling vertical and allows repeated horizontal swipes', () => {
    const { surface, model } = setup(true);
    pointer(surface, 'pointerdown', 50, 50, true);
    pointer(surface, 'pointermove', 53, 100, true);
    expect(model.style.getPropertyValue('--device-yaw')).toBe('0deg');
    expect(surface).toHaveAttribute('data-dragging', 'false');
    pointer(surface, 'pointerup', 53, 100, true);
    for (let i = 0; i < 3; i++) {
      pointer(surface, 'pointerdown', 0, 50, true);
      pointer(surface, 'pointermove', 200, 65, true);
      pointer(surface, 'pointerup', 200, 65, true);
    }
    expect(model.style.getPropertyValue('--device-yaw')).toBe('420deg');
    expect(model.style.getPropertyValue('--device-pitch')).toBe('0deg');
  });

  it('ends cancelled gestures and ignores a second pointer', () => {
    const { surface, model } = setup();
    pointer(surface, 'pointerdown', 0, 0, true);
    pointer(surface, 'pointerdown', 10, 10, true, 2);
    pointer(surface, 'pointermove', 200, 10, true, 2);
    expect(model.style.getPropertyValue('--device-yaw')).toBe('0deg');
    pointer(surface, 'pointermove', 100, 10, true);
    expect(model.style.getPropertyValue('--device-yaw')).toBe('70deg');
    pointer(surface, 'pointercancel', 100, 10, true);
    pointer(surface, 'pointermove', 200, 10, true);
    expect(model.style.getPropertyValue('--device-yaw')).toBe('70deg');
    expect(surface).toHaveAttribute('data-dragging', 'false');
  });

  it.each([false, true])(
    'returns the %s phone preview to center with Home/reset after rotating',
    async (phone) => {
      const user = userEvent.setup();
      const { surface, model, project, onSelect } = setup(phone);
      surface.focus();
      await user.keyboard('{ArrowRight>24/}');
      expect(model.style.getPropertyValue('--device-yaw')).toBe('360deg');
      await user.keyboard('{ArrowUp>10/}');
      expect(model.style.getPropertyValue('--device-pitch')).toBe('55deg');
      await user.keyboard('{Home}');
      expect(model.style.getPropertyValue('--device-yaw')).toBe('0deg');
      expect(model.style.getPropertyValue('--device-pitch')).toBe('0deg');
      await user.keyboard('{ArrowLeft}{ArrowDown}');
      await user.click(screen.getByRole('button', { name: `Reset ${project.name} view` }));
      expect(model.style.getPropertyValue('--device-yaw')).toBe('0deg');
      expect(model.style.getPropertyValue('--device-pitch')).toBe('0deg');
      expect(onSelect).not.toHaveBeenCalled();
      await user.click(screen.getByRole('button', { name: `Explore ${project.name}` }));
      expect(onSelect).toHaveBeenCalledOnce();
      expect(surface.querySelector('img')).toHaveAttribute('draggable', 'false');
    },
  );
});

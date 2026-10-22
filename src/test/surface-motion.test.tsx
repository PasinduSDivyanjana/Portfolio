import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useTilt } from '../hooks/useTilt';

function Surface() {
  const motion = useTilt<HTMLDivElement>(8);
  return <div data-testid="surface" {...motion} />;
}
function preferences({ fine = true, reduced = false } = {}) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query.includes('prefers-reduced-motion') ? reduced : fine,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
function bounds(element: HTMLElement) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 200,
    bottom: 100,
    width: 200,
    height: 100,
    toJSON: () => ({}),
  });
}
describe('surface motion', () => {
  afterEach(() => vi.restoreAllMocks());
  it('does not tilt for touch input or reduced-motion preferences', () => {
    preferences({ fine: false });
    render(<Surface />);
    const element = screen.getByTestId('surface');
    bounds(element);
    fireEvent(element, new MouseEvent('pointermove', { bubbles: true, clientX: 180, clientY: 20 }));
    expect(element.style.getPropertyValue('--tilt-x')).toBe('');
    preferences({ reduced: true });
    fireEvent(element, new MouseEvent('pointermove', { bubbles: true, clientX: 180, clientY: 20 }));
    expect(element.style.getPropertyValue('--tilt-x')).toBe('');
  });
  it('resets pending pointer motion when the pointer leaves', () => {
    preferences();
    let scheduled: FrameRequestCallback | undefined;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      scheduled = callback;
      return 21;
    });
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    render(<Surface />);
    const element = screen.getByTestId('surface');
    bounds(element);
    fireEvent(element, new MouseEvent('pointermove', { bubbles: true, clientX: 180, clientY: 20 }));
    act(() => scheduled?.(0));
    expect(element.style.getPropertyValue('--tilt-x')).toBe('2.4deg');
    expect(element.style.getPropertyValue('--tilt-y')).toBe('3.2deg');
    fireEvent(element, new MouseEvent('pointermove', { bubbles: true, clientX: 190, clientY: 10 }));
    fireEvent.pointerLeave(element);
    expect(cancel).toHaveBeenCalledWith(21);
    expect(element.style.getPropertyValue('--tilt-x')).toBe('0deg');
    expect(element.style.getPropertyValue('--tilt-y')).toBe('0deg');
  });
  it('cancels outstanding animation work on unmount', () => {
    preferences();
    vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(31);
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const { unmount } = render(<Surface />);
    const element = screen.getByTestId('surface');
    bounds(element);
    fireEvent(element, new MouseEvent('pointermove', { bubbles: true, clientX: 180, clientY: 20 }));
    unmount();
    expect(cancel).toHaveBeenCalledWith(31);
  });
});

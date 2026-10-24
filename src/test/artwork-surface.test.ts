import { afterEach, describe, expect, it, vi } from 'vitest';
import { acceptsArtworkPointer, createArtworkSurface } from '../lib/graphics/artworkSurface';

afterEach(() => vi.restoreAllMocks());

describe('scroll-stable section artwork', () => {
  it('keeps a section-owned canvas in place and copies only the local WebGL image', () => {
    const context = { clearRect: vi.fn(), drawImage: vi.fn() };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    );
    const slot = document.createElement('div');
    const surface = createArtworkSurface(slot)!;
    const source = document.createElement('canvas');
    source.width = 400;
    source.height = 300;
    surface.draw(source, 200, 160, 1.25);
    const localCanvas = slot.querySelector('canvas')!;
    expect(localCanvas.width).toBe(250);
    expect(localCanvas.height).toBe(200);
    expect(context.drawImage).toHaveBeenLastCalledWith(source, 0, 100, 250, 200, 0, 0, 250, 200);
    expect(slot.dataset.rendered).toBe('true');
    // Native scrolling moves this same DOM canvas, without reading its viewport position.
    const position = vi.spyOn(slot, 'getBoundingClientRect');
    surface.draw(source, 200, 160, 1.25);
    expect(position).not.toHaveBeenCalled();
    expect(slot.querySelector('canvas')).toBe(localCanvas);
    surface.dispose();
    expect(slot.querySelector('canvas')).toBeNull();
    expect(slot.dataset.rendered).toBeUndefined();
  });

  it('retains the fallback when a local drawing context is unavailable', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    const slot = document.createElement('div');
    expect(createArtworkSurface(slot)).toBeNull();
    expect(slot.children).toHaveLength(0);
    expect(slot.dataset.rendered).toBeUndefined();
  });

  it('ignores touch/pen gestures and devices without mouse hover', () => {
    expect(acceptsArtworkPointer('touch', true)).toBe(false);
    expect(acceptsArtworkPointer('touch', false)).toBe(false);
    expect(acceptsArtworkPointer('pen', true)).toBe(false);
    expect(acceptsArtworkPointer('mouse', false)).toBe(false);
    expect(acceptsArtworkPointer('mouse', true)).toBe(true);
  });
});

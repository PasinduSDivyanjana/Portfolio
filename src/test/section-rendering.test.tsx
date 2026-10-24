import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render as renderView, screen } from '@testing-library/react';
import SectionScenes from '../components/SectionScenes';

const drawing = vi.hoisted(() => ({ viewport: vi.fn(), copy: vi.fn(), render: vi.fn() }));
vi.mock('three', async (original) => ({
  ...(await original<typeof import('three')>()),
  WebGLRenderer: class {
    domElement: HTMLCanvasElement;
    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
      this.domElement = canvas;
    }
    setPixelRatio() {}
    getPixelRatio() {
      return 1;
    }
    setClearColor() {}
    setScissorTest() {}
    setScissor() {}
    clear() {}
    dispose() {}
    setSize(width: number, height: number) {
      this.domElement.width = width;
      this.domElement.height = height;
    }
    setViewport = drawing.viewport;
    render = drawing.render;
  },
}));
vi.mock('../lib/graphics/sectionSculptures', () => ({
  createStudioEnvironment: () => ({ texture: {}, dispose() {} }),
  createSectionSculpture: () => ({
    camera: { aspect: 1, updateProjectionMatrix() {} },
    scene: 'sculpture',
    update() {},
    dispose() {},
  }),
}));
vi.mock('../lib/graphics/contentAtmosphere', () => ({
  createContentAtmosphere: () => ({
    camera: { aspect: 1, updateProjectionMatrix() {} },
    scene: 'atmosphere',
    update() {},
    dispose() {},
  }),
}));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('desktop artwork scrolling', () => {
  it('keeps the same section canvas and image crop as its viewport position changes', () => {
    let intersection: IntersectionObserverCallback;
    let nextFrame: FrameRequestCallback;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersection = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      nextFrame = callback;
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1440);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect() {},
      drawImage: drawing.copy,
    } as unknown as CanvasRenderingContext2D);
    const { container, unmount } = renderView(
      <>
        <main>
          <div data-scene="about" data-testid="artwork" />
        </main>
        <SectionScenes />
      </>,
    );
    const slot = screen.getByTestId('artwork');
    let top = 100;
    vi.spyOn(slot, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          left: 100,
          right: 390,
          top,
          bottom: top + 215,
          width: 290,
          height: 215,
        }) as DOMRect,
    );
    vi.spyOn(container.querySelector('main')!, 'getBoundingClientRect').mockReturnValue({
      bottom: 2000,
    } as DOMRect);
    act(() => {
      intersection!(
        [
          {
            target: slot,
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: slot.getBoundingClientRect(),
            intersectionRect: slot.getBoundingClientRect(),
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver,
      );
      nextFrame!(0);
    });
    const canvas = slot.querySelector('canvas');
    expect(canvas).not.toBeNull();
    const firstCrop = drawing.copy.mock.calls.at(-1);
    top = -60;
    fireEvent.scroll(window);
    act(() => nextFrame!(16));
    expect(slot.querySelector('canvas')).toBe(canvas);
    expect(drawing.copy.mock.calls.at(-1)).toEqual(firstCrop);
    expect(drawing.viewport.mock.calls.filter((call) => call[2] === 290)).toEqual([
      [0, 0, 290, 215],
      [0, 0, 290, 215],
    ]);
    // Only atmosphere remains on the fixed WebGL canvas at the end of each frame.
    expect(drawing.render.mock.calls.at(-1)?.[0]).toBe('atmosphere');
    unmount();
    expect(slot.querySelector('canvas')).toBeNull();
  });
});

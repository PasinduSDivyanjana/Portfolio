import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createSectionSculpture,
  createStudioEnvironment,
  type Sculpture,
} from '../lib/graphics/sectionSculptures';
import { sceneKinds, type SceneKind } from '../types/scenes';
import { artworkViewport } from '../lib/graphics/artworkViewport';
import { createContentAtmosphere } from '../lib/graphics/contentAtmosphere';
import { acceptsArtworkPointer, createArtworkSurface } from '../lib/graphics/artworkSurface';

const localArtworkQuery = '(max-width: 700px), (pointer: coarse)';

/** One WebGL context; on touch layouts its output is copied into canvases owned by each section. */
export default function SectionScenes() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [localArtwork, setLocalArtwork] = useState(() => matchMedia(localArtworkQuery).matches);
  useEffect(() => {
    const layout = matchMedia(localArtworkQuery);
    const change = () => setLocalArtwork(layout.matches);
    layout.addEventListener('change', change);
    return () => layout.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!canvas.current) return;
    const slots = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: localArtwork ? document.createElement('canvas') : canvas.current,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, localArtwork ? 1.25 : 1.5));
    renderer.setClearColor(0, 0);
    renderer.autoClear = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    const environment = createStudioEnvironment(renderer);
    const ambient = localArtwork ? null : createContentAtmosphere();
    const hero = document.getElementById('home');
    const main = document.querySelector('main');
    const sculptures = new Map<SceneKind, Sculpture>();
    const surfaces = new Map<HTMLElement, NonNullable<ReturnType<typeof createArtworkSurface>>>();
    const pointer = new THREE.Vector2();
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const hover = matchMedia('(hover: hover) and (pointer: fine)');
    let frame: number | undefined,
      disposed = false;
    let width = document.documentElement.clientWidth,
      height = innerHeight;
    const visible = new Set<HTMLElement>();
    const start = performance.now();
    let lastDraw = 0;
    const schedule = () => {
      if (frame === undefined && !disposed && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const draw = () => {
      frame = undefined;
      if (disposed || document.hidden) return;
      const now = performance.now();
      if (!media.matches && localArtwork && now - lastDraw < 1000 / 30) {
        schedule();
        return;
      }
      lastDraw = now;
      renderer.setScissorTest(false);
      renderer.clear();
      const contentTop = Math.max(0, hero?.getBoundingClientRect().bottom ?? 0);
      const contentBottom = Math.min(height, main?.getBoundingClientRect().bottom ?? height);
      const contentVisible = !!ambient && contentBottom > contentTop;
      if (ambient && contentVisible) {
        ambient.camera.aspect = width / height;
        ambient.camera.updateProjectionMatrix();
        ambient.update((now - start) / 1000, pointer, media.matches);
        renderer.setViewport(0, 0, width, height);
        renderer.setScissorTest(true);
        renderer.setScissor(0, height - contentBottom, width, contentBottom - contentTop);
        renderer.render(ambient.scene, ambient.camera);
      }
      renderer.setScissorTest(true);
      let rendered = false;
      for (const element of visible) {
        const rect = element.getBoundingClientRect();
        const bounds = artworkViewport(rect, width, height);
        if (!bounds) continue;
        const kind = element.dataset.scene as SceneKind;
        if (!sceneKinds.includes(kind)) continue;
        let sculpture = sculptures.get(kind);
        if (!sculpture) {
          sculpture = createSectionSculpture(kind, environment.texture);
          sculptures.set(kind, sculpture);
        }
        sculpture.camera.aspect = rect.width / rect.height;
        sculpture.camera.updateProjectionMatrix();
        sculpture.update((now - start) / 1000, pointer, media.matches);
        if (localArtwork) {
          let surface = surfaces.get(element);
          if (!surface) {
            const created = createArtworkSurface(element);
            if (!created) continue;
            surface = created;
            surfaces.set(element, surface);
          }
          // Position is handled by the DOM, never by a scroll-dependent WebGL viewport.
          renderer.setViewport(0, 0, rect.width, rect.height);
          renderer.setScissor(0, 0, rect.width, rect.height);
          renderer.clear();
          renderer.render(sculpture.scene, sculpture.camera);
          surface.draw(renderer.domElement, rect.width, rect.height, renderer.getPixelRatio());
          rendered = true;
          continue;
        }
        renderer.setViewport(...bounds.viewport);
        renderer.setScissor(...bounds.scissor);
        renderer.render(sculpture.scene, sculpture.camera);
        element.dataset.rendered = 'true';
        rendered = true;
      }
      if ((rendered || contentVisible) && !media.matches) schedule();
    };
    let bufferWidth = 0,
      bufferHeight = 0;
    const resize = () => {
      width = document.documentElement.clientWidth;
      height = innerHeight;
      // Mobile browser chrome changes viewport height during a swipe. Slot dimensions stay stable.
      const nextWidth = localArtwork
        ? Math.max(1, ...slots.map((slot) => Math.ceil(slot.getBoundingClientRect().width)))
        : width;
      const nextHeight = localArtwork
        ? Math.max(1, ...slots.map((slot) => Math.ceil(slot.getBoundingClientRect().height)))
        : height;
      if (nextWidth !== bufferWidth || nextHeight !== bufferHeight) {
        bufferWidth = nextWidth;
        bufferHeight = nextHeight;
        renderer.setSize(bufferWidth, bufferHeight, false);
      }
      schedule();
    };
    const scroll = () => schedule();
    const move = (event: PointerEvent) => {
      if (!acceptsArtworkPointer(event.pointerType, hover.matches)) return;
      pointer.set(event.clientX / innerWidth - 0.5, event.clientY / innerHeight - 0.5);
    };
    const resetPointer = () => {
      pointer.set(0, 0);
      schedule();
    };
    const visibility = () => {
      if (document.hidden) {
        if (frame !== undefined) cancelAnimationFrame(frame);
        frame = undefined;
      } else schedule();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
          else visible.delete(entry.target as HTMLElement);
        }
        schedule();
      },
      { rootMargin: '40px' },
    );
    slots.forEach((element) => observer.observe(element));
    const pageResize = new ResizeObserver(resize);
    pageResize.observe(document.documentElement);
    const lost = (event: Event) => {
      event.preventDefault();
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      slots.forEach((element) => delete element.dataset.rendered);
      surfaces.forEach((surface) => surface.dispose());
      surfaces.clear();
    };
    const canvasElement = renderer.domElement;
    canvasElement.addEventListener('webglcontextlost', lost);
    addEventListener('resize', resize);
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', schedule);
    hover.addEventListener('change', resetPointer);
    resize();
    return () => {
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      observer.disconnect();
      pageResize.disconnect();
      removeEventListener('resize', resize);
      removeEventListener('scroll', scroll);
      removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', schedule);
      hover.removeEventListener('change', resetPointer);
      canvasElement.removeEventListener('webglcontextlost', lost);
      slots.forEach((element) => delete element.dataset.rendered);
      sculptures.forEach((sculpture) => sculpture.dispose());
      surfaces.forEach((surface) => surface.dispose());
      ambient?.dispose();
      environment.dispose();
      renderer.dispose();
    };
  }, [localArtwork]);
  return (
    <canvas ref={canvas} className="section-scenes" hidden={localArtwork} aria-hidden="true" />
  );
}

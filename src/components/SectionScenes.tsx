import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createSectionSculpture,
  createStudioEnvironment,
  type Sculpture,
} from '../lib/graphics/sectionSculptures';
import { sceneKinds, type SceneKind } from '../types/scenes';
import { artworkViewport } from '../lib/graphics/artworkViewport';
import { createContentAtmosphere } from '../lib/graphics/contentAtmosphere';

/** One shared context renders only the visible artwork slots, rather than a canvas per section. */
export default function SectionScenes() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const slots = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas.current,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.5));
    renderer.setClearColor(0, 0);
    renderer.autoClear = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    const environment = createStudioEnvironment(renderer);
    const ambient = createContentAtmosphere();
    const hero = document.getElementById('home');
    const main = document.querySelector('main');
    const sculptures = new Map<SceneKind, Sculpture>();
    const pointer = new THREE.Vector2();
    const media = matchMedia('(prefers-reduced-motion: reduce)');
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
      if (!media.matches && width < 700 && now - lastDraw < 1000 / 30) {
        schedule();
        return;
      }
      lastDraw = now;
      renderer.setScissorTest(false);
      renderer.clear();
      const contentTop = Math.max(0, hero?.getBoundingClientRect().bottom ?? 0);
      const contentBottom = Math.min(height, main?.getBoundingClientRect().bottom ?? height);
      const contentVisible = contentBottom > contentTop;
      if (contentVisible) {
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
        sculpture.update((performance.now() - start) / 1000, pointer, media.matches);
        renderer.setViewport(...bounds.viewport);
        renderer.setScissor(...bounds.scissor);
        renderer.render(sculpture.scene, sculpture.camera);
        element.dataset.rendered = 'true';
        rendered = true;
      }
      if ((rendered || contentVisible) && !media.matches) schedule();
    };
    const resize = () => {
      width = document.documentElement.clientWidth;
      height = innerHeight;
      renderer.setSize(width, height, false);
      schedule();
    };
    const scroll = () => schedule();
    const move = (event: PointerEvent) => {
      pointer.set(event.clientX / innerWidth - 0.5, event.clientY / innerHeight - 0.5);
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
    };
    const canvasElement = canvas.current;
    canvasElement.addEventListener('webglcontextlost', lost);
    addEventListener('resize', resize);
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', schedule);
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
      canvasElement.removeEventListener('webglcontextlost', lost);
      slots.forEach((element) => delete element.dataset.rendered);
      sculptures.forEach((sculpture) => sculpture.dispose());
      ambient.dispose();
      environment.dispose();
      renderer.dispose();
    };
  }, []);
  return <canvas ref={canvas} className="section-scenes" aria-hidden="true" />;
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Atmosphere() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 8;
    const count = innerWidth < 700 ? 420 : 850;
    const positions = new Float32Array(count * 3),
      colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = i * 0.072,
        radius = 1.4 + Math.random() * 3.6;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.58;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      const color = new THREE.Color(i % 5 === 0 ? '#88deed' : i % 3 === 0 ? '#bf9cff' : '#494052');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cloud = new THREE.Points(geometry, material);
    cloud.rotation.z = 0.18;
    scene.add(cloud);
    const haloGeometry = new THREE.BufferGeometry();
    const haloPositions = [];
    for (let i = 0; i < 180; i++) {
      const a = (i / 179) * Math.PI * 2;
      haloPositions.push(Math.cos(a) * 2.5, Math.sin(a) * 2.5, 0);
    }
    haloGeometry.setAttribute('position', new THREE.Float32BufferAttribute(haloPositions, 3));
    const haloMaterial = new THREE.LineBasicMaterial({
      color: 0x9573c9,
      transparent: true,
      opacity: 0.16,
    });
    const halo = new THREE.LineLoop(haloGeometry, haloMaterial);
    halo.rotation.x = 0.55;
    halo.rotation.y = 0.4;
    scene.add(halo);
    const pointer = { x: 0, y: 0 };
    let visible = true,
      frame: number | undefined,
      scroll = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches)
        return;
      pointer.x = (e.clientX / innerWidth - 0.5) * 0.3;
      pointer.y = (e.clientY / innerHeight - 0.5) * 0.2;
    };
    const onScroll = () => {
      scroll = Math.min(window.scrollY / innerHeight, 1.5);
    };
    const resize = new ResizeObserver(() => {
      const w = element.clientWidth,
        h = element.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduced) renderer.render(scene, camera);
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    observer.observe(element);
    addEventListener('pointermove', move, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    const clock = new THREE.Clock();
    const draw = () => {
      if (!reduced) frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (!reduced) {
        const t = clock.getElapsedTime();
        cloud.rotation.y = t * 0.018;
        cloud.rotation.z = 0.18 + scroll * 0.15;
        halo.rotation.z = t * 0.04;
        camera.position.x += (pointer.x - camera.position.x) * 0.025;
        camera.position.y += (-pointer.y - camera.position.y) * 0.025;
        camera.position.z = 8 + scroll * 1.5;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };
    draw();
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      removeEventListener('pointermove', move);
      removeEventListener('scroll', onScroll);
      geometry.dispose();
      material.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div className="atmosphere" ref={host} aria-hidden="true" />;
}

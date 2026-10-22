import * as THREE from 'three';
import type { Sculpture } from './sectionSculptures';

/** A quiet depth field continues the hero's atmosphere between the larger sculptures. */
export function createContentAtmosphere(): Sculpture {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.z = 12;
  const positions = new Float32Array(90 * 3);
  for (let i = 0; i < 90; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: '#c5a6e8',
    size: 0.023,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  return {
    scene,
    camera,
    update(time, pointer, reduced) {
      points.rotation.y = reduced ? 0 : time * 0.012;
      points.rotation.z = reduced ? 0 : Math.sin(time * 0.05) * 0.025;
      camera.position.x = reduced ? 0 : pointer.x * 0.12;
      camera.position.y = reduced ? 0 : -pointer.y * 0.1;
      camera.lookAt(0, 0, 0);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}

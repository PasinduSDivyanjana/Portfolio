import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { SceneKind } from '../../types/scenes';
import { createTechnologyNetwork } from './technologyNetwork';
import { addStudioLights } from './studioLighting';
import type { Technology } from '../../data/skills';
import { contactChannels } from '../../data/contactChannels';

export interface Sculpture {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  update: (time: number, pointer: THREE.Vector2, reduced: boolean) => void;
  dispose: () => void;
  setTechnologies?: (technologies: readonly Technology[]) => void;
}

export function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#35313f');
  for (const [x, y, z, width, height, color] of [
    [-4, 2, 2, 3, 7, '#ffffff'],
    [4, 0, 1, 3, 6, '#b1f1ff'],
    [0, 5, 1, 8, 3, '#ffffff'],
    [0, -4, 2, 6, 2, '#b79cff'],
  ] as const) {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
    );
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  }
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(studio, 0.04);
  studio.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      (object.material as THREE.Material).dispose();
    }
  });
  generator.dispose();
  return target;
}

export function createSectionSculpture(
  kind: SceneKind,
  environment: THREE.Texture,
  onChange?: () => void,
): Sculpture {
  if (kind === 'skills') return createTechnologyNetwork(environment, onChange);
  if (kind === 'contact') return createTechnologyNetwork(environment, onChange, contactChannels);
  const scene = new THREE.Scene();
  scene.environment = environment;
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
  camera.position.set(0, 0.1, 7.4);
  const object = new THREE.Group();
  scene.add(object);
  const chrome = new THREE.MeshStandardMaterial({
    color: '#cfc2ef',
    metalness: 0.94,
    roughness: 0.19,
    envMapIntensity: 1.45,
  });
  const pearl = new THREE.MeshStandardMaterial({
    color: '#e4d5f8',
    metalness: 0.48,
    roughness: 0.24,
    envMapIntensity: 1.25,
  });
  const cyan = new THREE.MeshStandardMaterial({
    color: '#9ae5ef',
    metalness: 0.68,
    roughness: 0.2,
    envMapIntensity: 1.5,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: '#eac49b',
    metalness: 0.87,
    roughness: 0.21,
    envMapIntensity: 1.7,
  });
  const violet = new THREE.MeshStandardMaterial({
    color: '#9270c4',
    metalness: 0.7,
    roughness: 0.25,
  });
  const materials = [chrome, pearl, cyan, gold, violet];
  const mesh = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material = chrome,
    parent: THREE.Object3D = object,
  ) => {
    const item = new THREE.Mesh(geometry, material);
    parent.add(item);
    return item;
  };
  const orbit = (
    radius: number,
    material: THREE.Material = cyan,
    parent: THREE.Object3D = object,
  ) => mesh(new THREE.TorusGeometry(radius, 0.018, 8, 100), material, parent);
  const animated: THREE.Object3D[] = [];
  if (kind === 'about') {
    mesh(new THREE.TorusKnotGeometry(0.93, 0.27, 120, 24, 2, 3));
    const ring = orbit(1.85, cyan);
    ring.rotation.set(0.65, -0.4, 0);
    animated.push(ring);
    const bead = mesh(new THREE.IcosahedronGeometry(0.18, 0), gold);
    bead.position.set(1.5, 0.9, 0.3);
  } else if (kind === 'work') {
    for (let i = 2; i >= 0; i--) {
      const window = new THREE.Group();
      object.add(window);
      window.position.set((i - 1) * 0.3, (1 - i) * 0.22, -i * 0.4);
      window.rotation.y = -0.22;
      mesh(new RoundedBoxGeometry(2.55, 1.65, 0.12, 3, 0.08), i === 0 ? chrome : violet, window);
      const screen = mesh(
        new RoundedBoxGeometry(2.3, 1.25, 0.035, 2, 0.04),
        i === 0 ? pearl : cyan,
        window,
      );
      screen.position.set(0, -0.07, 0.08);
      for (let dot = 0; dot < 3; dot++) {
        const d = mesh(new THREE.SphereGeometry(0.035, 10, 8), gold, window);
        d.position.set(-1 + dot * 0.12, 0.67, 0.085);
      }
      if (i === 0) {
        const rule = mesh(new THREE.BoxGeometry(0.7, 0.045, 0.02), violet, window);
        rule.position.set(-0.55, 0.18, 0.115);
        const rule2 = mesh(new THREE.BoxGeometry(1.25, 0.025, 0.02), violet, window);
        rule2.position.set(-0.27, -0.08, 0.115);
      }
    }
    object.rotation.z = -0.13;
  } else if (kind === 'experience') {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const t = i / 99,
        angle = t * Math.PI * 3.5;
      points.push(
        new THREE.Vector3(Math.cos(angle) * 0.95, (t - 0.5) * 2.7, Math.sin(angle) * 0.95),
      );
    }
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 100, 0.07, 10, false), chrome);
    for (let i = 0; i < 5; i++) {
      const t = i / 4,
        a = t * Math.PI * 3.5;
      const bead = mesh(new THREE.SphereGeometry(0.18, 18, 14), i % 2 ? gold : cyan);
      bead.position.set(Math.cos(a) * 0.95, (t - 0.5) * 2.7, Math.sin(a) * 0.95);
    }
  } else if (kind === 'education') {
    const crown = mesh(
      new THREE.SphereGeometry(0.68, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2),
      chrome,
    );
    crown.position.y = -0.28;
    const board = mesh(new RoundedBoxGeometry(2.25, 0.12, 2.25, 2, 0.06), pearl);
    board.position.y = 0.38;
    board.rotation.y = Math.PI / 4;
    const button = mesh(new THREE.SphereGeometry(0.075, 12, 12), gold);
    button.position.y = 0.49;
    const tassel = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.48, 0),
      new THREE.Vector3(0.4, 0.48, 0.45),
      new THREE.Vector3(0.85, 0.45, 0.75),
      new THREE.Vector3(1.1, -0.32, 0.7),
    ]);
    mesh(new THREE.TubeGeometry(tassel, 24, 0.035, 8, false), gold);
    const tip = mesh(new THREE.ConeGeometry(0.08, 0.3, 14), gold);
    tip.position.set(1.1, -0.45, 0.7);
    object.rotation.x = 0.35;
  } else if (kind === 'awards') {
    const profile = [
      new THREE.Vector2(0.1, 0),
      new THREE.Vector2(0.18, 0.1),
      new THREE.Vector2(0.5, 0.22),
      new THREE.Vector2(0.76, 0.55),
      new THREE.Vector2(0.87, 0.95),
      new THREE.Vector2(0.84, 1.04),
    ];
    const cup = mesh(new THREE.LatheGeometry(profile, 48), gold);
    cup.position.y = -0.2;
    const stem = mesh(new THREE.CylinderGeometry(0.11, 0.19, 0.7, 20), gold);
    stem.position.y = -0.5;
    const foot = mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.14, 32), pearl);
    foot.position.y = -0.93;
    for (const direction of [-1, 1]) {
      const handle = mesh(new THREE.TorusGeometry(0.39, 0.055, 10, 40), gold);
      handle.position.set(direction * 0.8, 0.27, 0);
      handle.scale.set(0.8, 1.1, 1);
    }
    const ring = orbit(1.65, chrome);
    ring.position.z = -0.5;
    ring.rotation.x = 0.3;
    animated.push(ring);
  }
  addStudioLights(scene);
  const rotation = object.rotation.clone();
  return {
    scene,
    camera,
    update(time, pointer, reduced) {
      const t = reduced ? 1 : time;
      object.rotation.y =
        rotation.y + (reduced ? 0.25 : Math.sin(t * 0.24) * 0.5 + pointer.x * 0.1);
      object.rotation.x = rotation.x + (reduced ? 0 : Math.sin(t * 0.3) * 0.06 + pointer.y * 0.06);
      object.position.y = reduced ? 0 : Math.sin(t * 0.85) * 0.07;
      animated.forEach((ring, i) => {
        ring.rotation.z = t * (i % 2 ? -0.1 : 0.1);
      });
    },
    dispose() {
      object.traverse((item) => {
        if (item instanceof THREE.Mesh) item.geometry.dispose();
      });
      materials.forEach((material) => material.dispose());
    },
  };
}

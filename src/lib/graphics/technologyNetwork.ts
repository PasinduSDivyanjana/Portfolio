import * as THREE from 'three';
import { getSkillTechnologies, type Technology } from '../../data/skills';
import type { Sculpture } from './sectionSculptures';
import { addStudioLights } from './studioLighting';

/** Billboard logo faces remain readable while the connected nodes move through depth. */
export function createTechnologyNetwork(
  environment: THREE.Texture,
  onChange?: () => void,
  initialNodes: readonly Technology[] = getSkillTechnologies(),
): Sculpture {
  const scene = new THREE.Scene();
  scene.environment = environment;
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
  camera.position.set(0, 0, 8.8);
  addStudioLights(scene);
  const pearl = new THREE.MeshStandardMaterial({
    color: '#ddcef4',
    metalness: 0.64,
    roughness: 0.25,
    envMapIntensity: 1.4,
  });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.53, 2), pearl);
  scene.add(core);
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.014, 8, 80),
    new THREE.MeshStandardMaterial({ color: '#a4dce9', metalness: 0.8, roughness: 0.2 }),
  );
  halo.rotation.set(0.6, 0.3, 0);
  scene.add(halo);

  for (let ring = 0; ring < 2; ring++) {
    const points = Array.from({ length: 97 }, (_, index) => {
      const angle = (index / 96) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * 1.96,
        Math.sin(angle) * 1.65,
        Math.sin(angle * 2) * 0.45,
      );
    });
    const rail = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({
        color: ring ? '#a68bcf' : '#8cd5de',
        transparent: true,
        opacity: ring ? 0.14 : 0.28,
      }),
    );
    rail.rotation.set(ring * 0.5, ring * 0.4, ring * 0.7);
    scene.add(rail);
  }
  const capacity = 7;
  const positions = new THREE.BufferAttribute(new Float32Array(capacity * 2 * 3), 3);
  const connections = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: '#c7a6e4', transparent: true, opacity: 0.3 }),
  );
  connections.geometry.setAttribute('position', positions);
  scene.add(connections);
  const circle = new THREE.CircleGeometry(0.35, 48);
  const rim = new THREE.TorusGeometry(0.385, 0.025, 8, 48);
  const face = new THREE.MeshBasicMaterial({ color: '#f3eef9', toneMapped: false });
  const loader = new THREE.TextureLoader();
  const textures = new Map<string, THREE.Texture>();
  let disposed = false;
  const texture = (url: string) => {
    const cached = textures.get(url);
    if (cached) return cached;
    const loaded = loader.load(url, (asset) => {
      if (disposed) {
        asset.dispose();
        return;
      }
      onChange?.();
    });
    loaded.colorSpace = THREE.SRGBColorSpace;
    textures.set(url, loaded);
    return loaded;
  };
  const createNode = (index: number) => {
    const group = new THREE.Group();
    group.name = 'technology-node-' + index;
    const border = new THREE.MeshStandardMaterial({
      color: '#a58ac7',
      metalness: 0.55,
      roughness: 0.28,
      emissive: '#a58ac7',
      emissiveIntensity: 0.12,
    });
    group.add(new THREE.Mesh(rim, border), new THREE.Mesh(circle, face));
    const logos = Array.from({ length: 2 }, () => {
      const material = new THREE.SpriteMaterial({ transparent: true, toneMapped: false });
      const sprite = new THREE.Sprite(material);
      sprite.position.z = 0.025;
      sprite.renderOrder = 1;
      group.add(sprite);
      return sprite;
    });
    scene.add(group);
    return { group, border, logos };
  };
  const nodes = Array.from({ length: Math.min(capacity, initialNodes.length) }, (_, index) =>
    createNode(index),
  );
  let selected: readonly Technology[] = [];
  let displayedOffset = -1;
  let cycleStart: number | null = null;
  const displayTechnologies = (offset: number) => {
    if (offset === displayedOffset) return;
    displayedOffset = offset;
    const visibleCount = Math.min(selected.length, nodes.length);
    connections.geometry.setDrawRange(0, visibleCount * 2);
    nodes.forEach((node, index) => {
      node.group.visible = index < visibleCount;
      if (!node.group.visible) return;
      const technology = selected[(offset + index) % selected.length];
      node.group.userData.technology = technology.name;
      node.border.color.set(technology.color);
      node.border.emissive.set(technology.color);
      node.logos.forEach((logo, iconIndex) => {
        const icon = technology.icons[iconIndex];
        logo.visible = !!icon;
        if (!icon) return;
        logo.material.map = texture(icon);
        logo.material.needsUpdate = true;
        const pair = technology.icons.length > 1;
        logo.scale.setScalar(pair ? 0.29 : 0.48);
        logo.position.x = pair ? (iconIndex ? 0.15 : -0.15) : 0;
      });
    });
  };
  const setTechnologies = (technologies: readonly Technology[]) => {
    if (technologies === selected) return;
    while (nodes.length < Math.min(capacity, technologies.length)) {
      nodes.push(createNode(nodes.length));
    }
    selected = technologies;
    displayedOffset = -1;
    cycleStart = null;
    displayTechnologies(0);
  };
  setTechnologies(initialNodes);
  return {
    scene,
    camera,
    setTechnologies,
    update(time, pointer, reduced) {
      cycleStart ??= time;
      const offset =
        !reduced && selected.length > nodes.length
          ? (Math.floor((time - cycleStart) / 6) * nodes.length) % selected.length
          : 0;
      displayTechnologies(offset);
      const t = reduced ? 0 : time;
      core.rotation.set(t * 0.08, t * 0.12, 0.15);
      halo.rotation.z = t * 0.1;
      nodes.forEach((node, index) => {
        if (!node.group.visible) return;
        const angle =
          (index * Math.PI * 2) / Math.min(selected.length, nodes.length) + Math.PI / 6 + t * 0.075;
        const x = Math.cos(angle) * 1.96 + (reduced ? 0 : pointer.x * 0.12);
        const y = Math.sin(angle) * 1.65 + (reduced ? 0 : pointer.y * 0.08);
        const z = Math.sin(angle * 2) * 0.45;
        node.group.position.set(x, y, z);
        node.group.quaternion.copy(camera.quaternion);
        positions.setXYZ(index * 2 + 1, x, y, z);
      });
      positions.needsUpdate = true;
    },
    dispose() {
      disposed = true;
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line)
          geometries.add(object.geometry);
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Sprite
        ) {
          const owned = Array.isArray(object.material) ? object.material : [object.material];
          owned.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((asset) => asset.dispose());
    },
  };
}

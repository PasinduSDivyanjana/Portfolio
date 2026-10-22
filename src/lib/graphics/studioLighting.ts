import * as THREE from 'three';

export function addStudioLights(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight('#fff3ff', '#5c4b80', 2.2));
  const key = new THREE.PointLight('#e6d0ff', 30);
  key.position.set(3, 3, 4);
  scene.add(key);
  const fill = new THREE.PointLight('#96efff', 18);
  fill.position.set(-3, -1, 3);
  scene.add(fill);
}

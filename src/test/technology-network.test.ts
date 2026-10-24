import { afterEach, describe, expect, it, vi } from 'vitest';
import { Texture, TextureLoader, Vector2 } from 'three';
import { createTechnologyNetwork } from '../lib/graphics/technologyNetwork';
import { getSkillTechnologies, skillGroups } from '../data/skills';

afterEach(() => vi.restoreAllMocks());

describe('technology logo network', () => {
  it('grows from six web nodes to seven backend nodes and shows every selected technology together', () => {
    const load = vi.spyOn(TextureLoader.prototype, 'load').mockImplementation(() => new Texture());
    const environment = new Texture();
    const network = createTechnologyNetwork(environment);
    const nodes = () =>
      network.scene.children.filter(
        (object) => object.name.startsWith('technology-node-') && object.visible,
      );
    expect(nodes()).toHaveLength(6);
    for (const [group, names] of Object.entries(skillGroups)) {
      network.setTechnologies?.(getSkillTechnologies(group));
      for (const reduced of [false, true]) {
        network.update(0, new Vector2(), reduced);
        network.update(60, new Vector2(), reduced);
        expect(nodes().map((node) => node.userData.technology)).toEqual(names);
      }
    }
    const uniqueIcons = new Set(
      Object.keys(skillGroups).flatMap((group) =>
        getSkillTechnologies(group).flatMap((item) => item.icons),
      ),
    );
    expect(load).toHaveBeenCalledTimes(uniqueIcons.size);
    network.setTechnologies?.(getSkillTechnologies('Web development'));
    network.update(0, new Vector2(), true);
    network.update(100, new Vector2(), true);
    expect(nodes().map((node) => node.userData.technology)).toEqual(
      skillGroups['Web development'].slice(0, 6),
    );
    expect(load).toHaveBeenCalledTimes(uniqueIcons.size);
    network.dispose();
    environment.dispose();
  });

  it('moves logo nodes through depth while preserving a static reduced-motion view', () => {
    vi.spyOn(TextureLoader.prototype, 'load').mockImplementation(() => new Texture());
    const environment = new Texture();
    const network = createTechnologyNetwork(environment);
    const node = network.scene.getObjectByName('technology-node-0')!;
    network.update(0, new Vector2(), false);
    const initial = node.position.clone();
    network.update(10, new Vector2(), false);
    expect(node.position.equals(initial)).toBe(false);
    expect(node.quaternion.equals(network.camera.quaternion)).toBe(true);
    network.update(10, new Vector2(), true);
    const still = node.position.clone();
    network.update(100, new Vector2(1, 1), true);
    expect(node.position.equals(still)).toBe(true);
    network.dispose();
    environment.dispose();
  });
});

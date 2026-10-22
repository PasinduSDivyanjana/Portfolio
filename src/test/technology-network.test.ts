import { afterEach, describe, expect, it, vi } from 'vitest';
import { Texture, TextureLoader, Vector2 } from 'three';
import { createTechnologyNetwork } from '../lib/graphics/technologyNetwork';
import { getSkillTechnologies, skillGroups } from '../data/skills';

afterEach(() => vi.restoreAllMocks());

describe('technology logo network', () => {
  it('keeps six connected nodes synchronized with the selected category and caches textures', () => {
    const load = vi.spyOn(TextureLoader.prototype, 'load').mockImplementation(() => new Texture());
    const environment = new Texture();
    const network = createTechnologyNetwork(environment);
    const nodes = () =>
      network.scene.children.filter((object) => object.name.startsWith('technology-node-'));
    expect(nodes()).toHaveLength(6);
    expect(nodes().map((node) => node.userData.technology)).toEqual(skillGroups['Web development']);
    expect(load).toHaveBeenCalledTimes(7); // HTML and CSS share a node, with one logo each.
    network.setTechnologies?.(getSkillTechnologies('Mobile & backend'));
    expect(nodes().map((node) => node.userData.technology)).toEqual(
      skillGroups['Mobile & backend'],
    );
    expect(load).toHaveBeenCalledTimes(13);
    network.setTechnologies?.(getSkillTechnologies('Mobile & backend'));
    network.setTechnologies?.(getSkillTechnologies('Web development'));
    expect(load).toHaveBeenCalledTimes(13);
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

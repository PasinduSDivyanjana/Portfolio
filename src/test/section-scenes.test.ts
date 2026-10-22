import { describe, expect, it } from 'vitest';
import { Texture, Vector2 } from 'three';
import { artworkViewport } from '../lib/graphics/artworkViewport';
import { createSectionSculpture } from '../lib/graphics/sectionSculptures';
import { sceneKinds } from '../types/scenes';

describe('shared section artwork', () => {
  it('clips a partially visible slot without moving or stretching the model viewport', () => {
    const bounds = artworkViewport(
      { left: -20, right: 180, top: -50, bottom: 150, width: 200, height: 200 },
      390,
      844,
    );
    expect(bounds?.viewport).toEqual([-20, 694, 200, 200]);
    expect(bounds?.scissor).toEqual([0, 694, 180, 150]);
  });
  it('does not draw off-screen slots', () => {
    expect(
      artworkViewport(
        { left: 20, right: 220, top: 850, bottom: 1050, width: 200, height: 200 },
        390,
        844,
      ),
    ).toBeNull();
  });
  it('keeps every sculpture static when reduced motion is requested', () => {
    const environment = new Texture();
    for (const kind of sceneKinds) {
      const sculpture = createSectionSculpture(kind, environment);
      sculpture.update(0, new Vector2(0, 0), true);
      sculpture.scene.updateMatrixWorld(true);
      const before: number[][] = [];
      sculpture.scene.traverse((object) => before.push(object.matrixWorld.elements.slice()));
      sculpture.update(120, new Vector2(1, 1), true);
      sculpture.scene.updateMatrixWorld(true);
      const after: number[][] = [];
      sculpture.scene.traverse((object) => after.push(object.matrixWorld.elements.slice()));
      expect(after).toEqual(before);
      sculpture.dispose();
    }
    environment.dispose();
  });
});

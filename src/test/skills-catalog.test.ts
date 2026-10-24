import { describe, expect, it } from 'vitest';
import { skillGroups, technologies } from '../data/skills';

describe('technology catalog', () => {
  it('keeps every listed technology unique and backed by local icon metadata', () => {
    const names = Object.values(skillGroups).flat();
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) {
      expect(technologies[name]?.name).toBe(name);
      expect(technologies[name].icons.length).toBeGreaterThan(0);
      for (const icon of technologies[name].icons) {
        expect(icon).toMatch(/^\.\/Images\/Technologies\/[\w-]+\.svg$/);
      }
    }
  });
});

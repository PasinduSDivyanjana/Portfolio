export const sceneKinds = [
  'about',
  'work',
  'skills',
  'experience',
  'education',
  'awards',
  'contact',
] as const;
export type SceneKind = (typeof sceneKinds)[number];

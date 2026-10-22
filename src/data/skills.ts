export const skillGroups = {
  'Web development': ['React', 'Next.js', 'JavaScript', 'Node.js', 'HTML & CSS', 'Tailwind CSS'],
  'Mobile & backend': ['Kotlin', 'Android', 'PHP', 'Java', 'MongoDB', 'MySQL'],
};
export interface Technology {
  name: string;
  icons: readonly string[];
  color: string;
}
const technology = (name: string, icons: string[], color: string): Technology => ({
  name,
  icons: icons.map((icon) => `./Images/Technologies/${icon}.svg`),
  color,
});
export const technologies: Record<string, Technology> = {
  React: technology('React', ['react'], '#61dafb'),
  'Next.js': technology('Next.js', ['nextjs'], '#c9b8ee'),
  JavaScript: technology('JavaScript', ['javascript'], '#f7df1e'),
  'Node.js': technology('Node.js', ['nodejs'], '#83cd29'),
  'HTML & CSS': technology('HTML & CSS', ['html5', 'css3'], '#ed865c'),
  'Tailwind CSS': technology('Tailwind CSS', ['tailwindcss'], '#38bdf8'),
  Kotlin: technology('Kotlin', ['kotlin'], '#b27cff'),
  Android: technology('Android', ['android'], '#a4c639'),
  PHP: technology('PHP', ['php'], '#a5a9de'),
  Java: technology('Java', ['java'], '#f89820'),
  MongoDB: technology('MongoDB', ['mongodb'], '#56b15e'),
  MySQL: technology('MySQL', ['mysql'], '#5facc9'),
};
export type SkillTab = keyof typeof skillGroups;
const technologyGroups = {
  'Web development': skillGroups['Web development'].map((name) => technologies[name]),
  'Mobile & backend': skillGroups['Mobile & backend'].map((name) => technologies[name]),
};
export function getSkillTechnologies(group?: string): readonly Technology[] {
  return technologyGroups[group === 'Mobile & backend' ? group : 'Web development'];
}

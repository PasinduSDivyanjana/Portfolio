export const skillGroups = {
  'Web development': ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML & CSS', 'Tailwind CSS'],
  'Mobile development': ['React Native', 'Flutter', 'Dart', 'Kotlin', 'Android', 'Expo'],
  'Backend & databases': ['Node.js', 'Express.js', 'Java', 'PHP', 'MongoDB', 'MySQL', 'Firebase'],
  'Tools & deployment': ['Git', 'GitHub', 'GitHub Actions', 'Vercel'],
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
  TypeScript: technology('TypeScript', ['typescript'], '#3178c6'),
  'Node.js': technology('Node.js', ['nodejs'], '#83cd29'),
  'HTML & CSS': technology('HTML & CSS', ['html5', 'css3'], '#ed865c'),
  'Tailwind CSS': technology('Tailwind CSS', ['tailwindcss'], '#38bdf8'),
  'React Native': technology('React Native', ['react'], '#61dafb'),
  Expo: technology('Expo', ['expo'], '#4630eb'),
  Flutter: technology('Flutter', ['flutter'], '#54c5f8'),
  Dart: technology('Dart', ['dart'], '#00b4ab'),
  'Express.js': technology('Express.js', ['express'], '#c9b8ee'),
  Firebase: technology('Firebase', ['firebase'], '#ffca28'),
  Kotlin: technology('Kotlin', ['kotlin'], '#b27cff'),
  Android: technology('Android', ['android'], '#a4c639'),
  PHP: technology('PHP', ['php'], '#a5a9de'),
  Java: technology('Java', ['java'], '#f89820'),
  MongoDB: technology('MongoDB', ['mongodb'], '#56b15e'),
  MySQL: technology('MySQL', ['mysql'], '#5facc9'),
  Git: technology('Git', ['git'], '#f05032'),
  GitHub: technology('GitHub', ['github'], '#b9b3cb'),
  Vercel: technology('Vercel', ['vercel'], '#b9b3cb'),
  'GitHub Actions': technology('GitHub Actions', ['githubactions'], '#2088ff'),
};
export type SkillTab = keyof typeof skillGroups;
const technologyGroups = Object.fromEntries(
  Object.entries(skillGroups).map(([group, names]) => [
    group,
    names.map((name) => technologies[name]),
  ]),
) as Record<SkillTab, Technology[]>;
export function getSkillTechnologies(group?: string): readonly Technology[] {
  return technologyGroups[
    group && Object.hasOwn(technologyGroups, group) ? (group as SkillTab) : 'Web development'
  ];
}

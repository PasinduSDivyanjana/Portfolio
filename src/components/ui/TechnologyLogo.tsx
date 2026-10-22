import { technologies } from '../../data/skills';

export function TechnologyLogo({ name }: { name: string }) {
  const technology = technologies[name];
  return (
    <span
      className={'technology-logo ' + (technology.icons.length > 1 ? 'technology-logo-pair' : '')}
      aria-hidden="true"
    >
      {technology.icons.map((icon) => (
        <img key={icon} src={icon} alt="" width={24} height={24} loading="lazy" />
      ))}
    </span>
  );
}

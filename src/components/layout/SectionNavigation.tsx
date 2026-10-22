import { navigation } from '../../data/navigation';
import type { SectionId } from '../../types/portfolio';
export function SectionNavigation({ active }: { active: SectionId }) {
  return (
    <nav className="floating-dock" aria-label="Section navigation">
      {navigation.map(({ id, name, icon: Icon }) => (
        <a
          className={active === id ? 'active' : ''}
          href={'#' + id}
          key={id}
          aria-label={name}
          title={name}
          aria-current={active === id ? 'location' : undefined}
        >
          <Icon size={16} strokeWidth={1.6} />
          <span>{name}</span>
        </a>
      ))}
    </nav>
  );
}

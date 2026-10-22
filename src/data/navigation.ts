import { Award, Code2, GraduationCap, Home, Layers3, Send, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionId } from '../types/portfolio';

interface NavigationItem {
  id: SectionId;
  name: string;
  icon: LucideIcon;
  headerLabel?: string;
}
export const navigation: NavigationItem[] = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'about', name: 'About', icon: UserRound, headerLabel: 'About' },
  { id: 'work', name: 'Work', icon: Layers3, headerLabel: 'Selected work' },
  { id: 'skills', name: 'Skills', icon: Code2, headerLabel: 'My toolkit' },
  { id: 'education', name: 'Education', icon: GraduationCap, headerLabel: 'Education' },
  {
    id: 'certifications',
    name: 'Awards',
    icon: Award,
    headerLabel: 'Certifications & Achievements',
  },
  { id: 'contact', name: 'Contact', icon: Send },
];

export const sectionNavigation: Partial<Record<SectionId, SectionId>> = { journey: 'skills' };

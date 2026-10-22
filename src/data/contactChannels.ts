import { profile } from './profile';
import type { Technology } from './skills';

export interface ContactChannel extends Technology {
  id: string;
  href: string;
}

export const contactChannels: readonly ContactChannel[] = [
  {
    id: 'github',
    name: 'GitHub',
    color: '#c9b8ee',
    icons: ['./Images/Contact/github.svg'],
    href: profile.github,
  },
  {
    id: 'email',
    name: 'Email',
    color: '#b998ec',
    icons: ['./Images/Contact/email.svg'],
    href: 'mailto:' + profile.email,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#69b9ef',
    icons: ['./Images/Contact/linkedin.svg'],
    href: profile.linkedIn,
  },
];

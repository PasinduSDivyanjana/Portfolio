export type SectionId =
  'home' | 'about' | 'work' | 'skills' | 'journey' | 'education' | 'certifications' | 'contact';
export type ProjectCategory = 'Web development' | 'Mobile apps';
export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  type: string;
  image: string;
  text: string;
  tech: string[];
  url?: string;
  displayNumber: string;
  color: string;
  featured: boolean;
  preview: { kind: 'phone' } | { kind: 'browser'; hostname: string };
}

export interface Qualification {
  year: string;
  title: string;
  summary: string;
  resultsLabel: string;
  results: readonly (readonly [string, string])[];
  initiallyOpen?: boolean;
}

export interface School {
  name: string;
  city: string;
  stage: string;
  logo: string;
  qualifications: Qualification[];
  scholarship?: { year: string; title: string; score: number; cutoff: number };
}

export interface Certificate {
  title: string;
  issuer: string;
  status: 'Completed' | 'In progress';
}

export type CredentialCategory =
  'Foundations' | 'Performance' | 'Scaling & resilience' | 'Security';
export interface SkillCredential {
  id: string;
  title: string;
  skill: string;
  category: CredentialCategory;
  description: string;
  issuedOn: string;
  durationMinutes: number;
  verificationUrl: string;
  badge: string;
  preview: string;
  pdf: string;
}

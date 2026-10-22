import { lazy, Suspense, useRef } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SectionNavigation } from './components/layout/SectionNavigation';
import { TypeRibbon } from './components/TypeRibbon';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { WorkSection } from './sections/WorkSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ContactSection } from './sections/ContactSection';
import { useReveal } from './hooks/useReveal';
import { useActiveSection } from './hooks/useActiveSection';

const SectionScenes = lazy(() => import('./components/SectionScenes'));

export default function Portfolio() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);
  const active = useActiveSection(main);
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Header />
      <main ref={main}>
        <HeroSection />
        <AboutSection />
        <TypeRibbon />
        <WorkSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <SectionScenes />
      </Suspense>
      <SectionNavigation active={active} />
    </>
  );
}

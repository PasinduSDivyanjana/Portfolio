import { useEffect, useState, type RefObject } from 'react';
import { sectionNavigation } from '../data/navigation';
import type { SectionId } from '../types/portfolio';

export function useActiveSection(root: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<SectionId>('home');
  useEffect(() => {
    const sections = [
      ...(root.current?.querySelectorAll<HTMLElement>(':scope > section[id]') ?? []),
    ];
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      const target = sections
        .filter((element) => element.getBoundingClientRect().top < innerHeight * 0.48)
        .at(-1);
      if (target) {
        const id = target.id as SectionId;
        setActive(sectionNavigation[id] ?? id);
      }
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [root]);
  return active;
}

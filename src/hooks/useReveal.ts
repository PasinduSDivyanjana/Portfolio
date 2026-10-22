import { useEffect, type RefObject } from 'react';

export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [root]);
}

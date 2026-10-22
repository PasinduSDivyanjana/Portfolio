import { useEffect, useRef, type PointerEvent } from 'react';

export function useHeroMotion() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const progress = media.matches ? 0 : Math.min(1, Math.max(0, -rect.top / rect.height));
      element.style.setProperty('--scroll', String(progress));
      if (media.matches) {
        element.style.setProperty('--mx', '0');
        element.style.setProperty('--my', '0');
      }
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    addEventListener('scroll', schedule, { passive: true });
    media.addEventListener('change', update);
    update();
    return () => {
      removeEventListener('scroll', schedule);
      media.removeEventListener('change', update);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !matchMedia('(hover: hover) and (pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--mx',
      String((event.clientX - rect.left) / rect.width - 0.5),
    );
    event.currentTarget.style.setProperty(
      '--my',
      String((event.clientY - rect.top) / rect.height - 0.5),
    );
  };
  const onPointerLeave = () => {
    ref.current?.style.setProperty('--mx', '0');
    ref.current?.style.setProperty('--my', '0');
  };
  return { ref, onPointerMove, onPointerLeave };
}

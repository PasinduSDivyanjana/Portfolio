import { useEffect, useRef, type PointerEvent } from 'react';

/** Pointer motion updates CSS variables without rerendering content or running on touch devices. */
export function useTilt<T extends HTMLElement>(strength = 5) {
  const ref = useRef<T>(null);
  const frame = useRef<number | undefined>(undefined);
  useEffect(
    () => () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    },
    [],
  );
  const onPointerMove = (event: PointerEvent<T>) => {
    if (
      !matchMedia('(hover: hover) and (pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const element = event.currentTarget,
      rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width,
      y = (event.clientY - rect.top) / rect.height;
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--tilt-x', `${(0.5 - y) * strength}deg`);
      element.style.setProperty('--tilt-y', `${(x - 0.5) * strength}deg`);
      element.style.setProperty('--spot-x', `${x * 100}%`);
      element.style.setProperty('--spot-y', `${y * 100}%`);
      frame.current = undefined;
    });
  };
  const onPointerLeave = () => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = undefined;
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  };
  return { ref, onPointerMove, onPointerLeave, 'data-tilt': true };
}

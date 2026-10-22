import { useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react';

type Rotation = { yaw: number; pitch: number };
type Drag = {
  id: number;
  x: number;
  y: number;
  rotation: Rotation;
  touch: boolean;
  active: boolean;
};

const clampPitch = (pitch: number) => Math.max(-55, Math.min(55, pitch));

/** Horizontal touch gestures rotate; vertical gestures remain available for page scrolling. */
export function useDeviceRotation(initial: Rotation) {
  const [rotation, setRotation] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<Drag | null>(null);

  const finishDrag = (element: HTMLElement) => {
    const pointer = drag.current;
    drag.current = null;
    setDragging(false);
    if (pointer && element.hasPointerCapture(pointer.id)) element.releasePointerCapture(pointer.id);
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current || !event.isPrimary || event.button !== 0) return;
    const touch = event.pointerType === 'touch';
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      rotation,
      touch,
      active: !touch,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (!touch) {
      event.currentTarget.focus({ preventScroll: true });
      setDragging(true);
    }
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = drag.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (!pointer.active) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        finishDrag(event.currentTarget);
        return;
      }
      pointer.active = true;
      setDragging(true);
    }
    // Keep yaw unbounded so repeated swipes can turn through multiple revolutions.
    setRotation({
      yaw: pointer.rotation.yaw + dx * 0.7,
      pitch: pointer.touch
        ? pointer.rotation.pitch
        : clampPitch(pointer.rotation.pitch - dy * 0.35),
    });
  };
  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id === event.pointerId) finishDrag(event.currentTarget);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Home') {
      event.preventDefault();
      setRotation(initial);
      return;
    }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    setRotation((current) => ({
      yaw: current.yaw + (event.key === 'ArrowRight' ? 15 : event.key === 'ArrowLeft' ? -15 : 0),
      pitch: clampPitch(
        current.pitch + (event.key === 'ArrowUp' ? 10 : event.key === 'ArrowDown' ? -10 : 0),
      ),
    }));
  };

  return {
    rotation,
    dragging,
    reset: () => setRotation(initial),
    controls: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onLostPointerCapture: onPointerEnd,
      onBlur: (event: FocusEvent<HTMLDivElement>) => finishDrag(event.currentTarget),
      onKeyDown,
    },
  };
}

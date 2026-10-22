type Rect = Pick<DOMRect, 'left' | 'right' | 'top' | 'bottom' | 'width' | 'height'>;

/** Preserve the camera viewport while clipping draws to the visible part of its DOM slot. */
export function artworkViewport(rect: Rect, width: number, height: number) {
  const left = Math.max(0, rect.left),
    right = Math.min(width, rect.right);
  const top = Math.max(0, rect.top),
    bottom = Math.min(height, rect.bottom);
  if (right <= left || bottom <= top || rect.width <= 0 || rect.height <= 0) return null;
  return {
    viewport: [rect.left, height - rect.bottom, rect.width, rect.height] as const,
    scissor: [left, height - bottom, right - left, bottom - top] as const,
  };
}

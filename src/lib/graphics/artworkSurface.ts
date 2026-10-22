/** A DOM-owned bitmap stays attached to its section during native/compositor scrolling. */
export function createArtworkSurface(element: HTMLElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  canvas.className = 'artwork-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  element.appendChild(canvas);
  return {
    draw(source: HTMLCanvasElement, width: number, height: number, pixelRatio: number) {
      const pixelWidth = Math.max(1, Math.floor(width * pixelRatio));
      const pixelHeight = Math.max(1, Math.floor(height * pixelRatio));
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
      context.clearRect(0, 0, pixelWidth, pixelHeight);
      // WebGL's viewport begins at the lower left; canvas image coordinates begin at the upper left.
      context.drawImage(
        source,
        0,
        source.height - pixelHeight,
        pixelWidth,
        pixelHeight,
        0,
        0,
        pixelWidth,
        pixelHeight,
      );
      element.dataset.rendered = 'true';
    },
    dispose() {
      canvas.remove();
      delete element.dataset.rendered;
    },
  };
}

export function acceptsArtworkPointer(pointerType: string, canHover: boolean) {
  return canHover && pointerType === 'mouse';
}

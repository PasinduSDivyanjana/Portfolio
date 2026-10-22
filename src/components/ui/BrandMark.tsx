/** Shared, decorative mark; the containing home link supplies its accessible name. */
export function BrandMark() {
  return (
    <img
      className="brand-mark"
      src="./branding/psd-connected.svg"
      alt=""
      width={48}
      height={48}
      draggable={false}
    />
  );
}

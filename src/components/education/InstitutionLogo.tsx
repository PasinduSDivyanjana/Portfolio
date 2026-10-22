export function InstitutionLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="institution-logo">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

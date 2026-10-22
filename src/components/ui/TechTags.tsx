export function TechTags({ items }: { items: readonly string[] }) {
  return (
    <div className="tech-tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

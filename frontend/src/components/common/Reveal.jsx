import useReveal from "../../hooks/useReveal";

// Wraps children in a fade/slide-up transition that plays once, the first
// time the element scrolls into view. `delay` (ms) staggers grids of cards.
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

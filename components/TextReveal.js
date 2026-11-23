// Content stays readable without JavaScript or an intersection observer.
export default function TextReveal({ text, className = "" }) {
  return <p className={className}>{text}</p>;
}

"use client";
import Reveal from "./Reveal";

export default function SectionHeading({ index, label, title }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mut">
            {index} — {label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      {title && (
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl tracking-tight">
            {title}
          </h2>
        </Reveal>
      )}
    </div>
  );
}

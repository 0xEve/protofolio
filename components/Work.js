"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Set once app.py is deployed somewhere public (Render, Railway,
// PythonAnywhere, Hugging Face Spaces...). "Try it" opens that real,
// separately-hosted app directly — no embedding, no in-site routing.
const SPAM_DEMO_URL = process.env.NEXT_PUBLIC_SPAM_DEMO_URL || "";

function Cover({ index }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-soft transition-colors duration-500">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
        <span className="absolute -bottom-6 left-2 font-display font-extrabold text-[8rem] md:text-[11rem] leading-none text-outline select-none">
          0{index}
        </span>

        <span className="absolute -top-16 -right-12 w-56 h-56 md:w-72 md:h-72 rounded-full border border-line" />

        <span className="absolute top-10 right-24 w-16 h-16 md:w-20 md:h-20 bg-fg transition-transform duration-700 group-hover:rotate-45" />
      </div>

      <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mut">
        Case study
      </span>
    </div>
  );
}

export default function Work() {
  const featured = profile.projects.slice(0, 2);
  const rest = profile.projects.slice(2);

  return (
    <section
      id="work"
      className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-36"
    >
      <SectionHeading
        index="02"
        label="Selected Work"
        title="Things I've built"
      />

      <div className="space-y-20">
        {featured.map((p, i) => {
          return (
            <Reveal key={p.title}>
              <div className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Project Cover */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`block overflow-hidden border border-line ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Cover index={i + 1} />
                </a>

                {/* Project Information */}
                <div>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mut">
                    <span>0{i + 1}</span>

                    <span className="h-px w-8 bg-line" />

                    <span>{p.category}</span>

                    <span>/</span>

                    <span>{p.year}</span>
                  </div>

                  <h3 className="mt-5 font-display font-bold text-3xl md:text-5xl tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {p.title}
                  </h3>

                  <p className="mt-5 text-mut leading-relaxed max-w-lg">
                    {p.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-[0.15em] border border-line px-3 py-1.5 text-mut"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="link-sweep inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em]"
                    >
                      View on GitHub

                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>

                    {p.demo && SPAM_DEMO_URL && (
                      <a
                        href={SPAM_DEMO_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-fg text-bg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] hover:opacity-85 transition-opacity"
                      >
                        Try it

                        <Play size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Remaining Projects */}
      {rest.length > 0 && (
        <div className="mt-20 border-t border-line">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-12 items-baseline gap-4 py-8 md:py-10 border-b border-line"
              >
                <span className="md:col-span-1 font-mono text-xs text-mut">
                  0{i + 3}
                </span>

                <h3 className="col-span-2 md:col-span-6 font-display font-bold text-xl md:text-3xl tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {p.title}
                </h3>

                <span className="hidden md:block md:col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
                  {p.category}
                </span>

                <span className="hidden md:block md:col-span-1 font-mono text-[11px] text-mut">
                  {p.year}
                </span>

                <span className="md:col-span-1 justify-self-end">
                  <ArrowUpRight
                    size={20}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
"use client";

import { ArrowUpRight, Play, Terminal, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function Cover({ project }) {
  if (project.title === "EVHunter") return (
    <figure className="bg-bg p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-line pb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">EVHunter / workflow</span>
        <Terminal size={16} strokeWidth={1.25} className="text-mut" aria-hidden="true" />
      </div>
      <div className="py-5 md:py-7">
        {[
          ["01", "Recon", "Nmap · Subfinder · Nuclei"],
          ["02", "Analyze & verify", "Compact JSON · AI-assisted analysis"],
          ["03", "Review & report", "SQLite history · Markdown / HTML"],
        ].map(([number, title, detail], i) => (
          <div key={number}>
            <div className="flex items-start gap-4 py-3">
              <span className="pt-1 font-mono text-[10px] text-mut">{number}</span>
              <div>
                <div className="font-display text-xl md:text-2xl tracking-tight">{title}</div>
                <div className="mt-1 font-mono text-[9px] md:text-[10px] leading-relaxed text-mut">{detail}</div>
              </div>
            </div>
            {i < 2 && <ArrowDown size={12} strokeWidth={1} className="ml-[29px] text-mut" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <figcaption className="border-t border-line pt-4 font-mono text-[9px] uppercase tracking-[0.16em] leading-relaxed text-mut">
        Project overview / not a scan result
      </figcaption>
    </figure>
  );
  return (
    <figure className="bg-soft">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={project.image} alt={project.imageAlt} width="1200" height="750"
          loading="lazy" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]" />
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-mut">
        {project.imageCaption}
      </figcaption>
    </figure>
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
                  <Cover project={p} />
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

                  <ul className="mt-5 space-y-2 text-sm leading-relaxed">
                    {p.highlights?.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-mut">+</span>{item}</li>)}
                  </ul>
                  <p className="mt-5 border-l border-line pl-4 text-xs leading-relaxed text-mut">{p.note}</p>
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

                    {p.demo && (
                      <a
                        href={p.demo}
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

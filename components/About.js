"use client";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-36">
      <SectionHeading index="01" label="About" />
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-2">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mut">Who I am</span>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <TextReveal
            text={profile.about}
            className="font-display font-semibold text-2xl md:text-4xl leading-snug tracking-tight"
          />
          <Reveal delay={0.3} className="mt-10">
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-3 border border-fg px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-fg hover:text-bg transition-colors duration-300"
            >
              Download CV <Download size={14} />
            </a>
          </Reveal>
        </div>
        <div className="md:col-span-3 md:border-l md:border-line md:pl-8 space-y-8">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="font-display font-bold text-4xl md:text-5xl">
                {s.value}{s.suffix}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
                {s.label}
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <div className="pt-6 border-t border-line space-y-2">
              {profile.languages.map((l) => (
                <div key={l} className="font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
                  {l}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

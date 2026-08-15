"use client";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  const edu = profile.education;

  return (
    <section id="education" className="bg-soft border-y border-line transition-colors duration-500">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <SectionHeading index="04" label="Education & Training" title="Where I'm building my foundation" />

        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 pb-12 border-b border-line">
            <div className="md:col-span-3 font-mono text-xs uppercase tracking-[0.2em] text-mut">
              {edu.period}
            </div>
            <div className="md:col-span-5">
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                {edu.school}
              </h3>
              <div className="mt-2 text-mut">{edu.degree}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
                {edu.note}
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="font-display font-bold text-3xl md:text-4xl">
                {edu.gpa.split(" ")[0]}
                <span className="text-mut text-lg md:text-xl font-body font-normal"> / 4.0 GPA</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="pt-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mut">
            Certifications & Training
          </span>
        </Reveal>

        <div>
          {profile.certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="group grid md:grid-cols-12 gap-3 md:gap-10 py-8 border-b border-line">
                <span className="md:col-span-3 font-mono text-xs uppercase tracking-[0.2em] text-mut">
                  {c.date}
                </span>
                <h4 className="md:col-span-6 font-display font-semibold text-lg md:text-xl tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                  {c.title}
                </h4>
                <span className="md:col-span-3 text-sm text-mut">{c.issuer}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

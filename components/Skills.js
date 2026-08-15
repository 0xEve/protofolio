"use client";
import { Plus } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-36">
      <SectionHeading index="03" label="Skills" title="Tools of the craft" />
      <div className="grid md:grid-cols-3 gap-12">
        {profile.skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.1}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mut mb-6">{g.title}</h3>
            <ul className="space-y-3">
              {g.items.map((s) => (
                <li key={s} className="flex items-center gap-3 text-lg md:text-xl font-display font-medium group/item">
                  <Plus size={14} className="text-mut transition-transform duration-300 group-hover/item:rotate-90" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

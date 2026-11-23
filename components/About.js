"use client";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-36">
      <SectionHeading index="01" label="About" />
      <div className="grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-3">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">Who I am</h2>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mut">{profile.location}</div>
        </div>
        <div className="md:col-span-9">
          <Reveal>
            <p className="max-w-[660px] text-lg md:text-[22px] leading-[1.75] tracking-[-0.015em] text-fg">{profile.about}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-mut">
              <span>Focus / web application security</span>
              <span>Learning / PyTorch & deep learning</span>
            </div>
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mut">{profile.availability}</span>
              <a href={profile.resumeUrl} className="link-sweep inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.15em]">
                Download CV <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

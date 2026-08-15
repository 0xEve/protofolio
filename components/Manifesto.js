"use client";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function Manifesto() {
  return (
    <section className="border-t border-line">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <Reveal>
            <span className="font-display font-extrabold text-7xl text-outline leading-none select-none">
              &ldquo;
            </span>
          </Reveal>
        </div>
        <div className="md:col-span-10">
          <TextReveal
            text={profile.manifesto.text}
            className="font-display font-semibold text-2xl md:text-4xl leading-snug tracking-tight"
          />
          <Reveal delay={0.3}>
            <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-mut">
              {profile.manifesto.author} — {profile.manifesto.role}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowUp, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

export default function Contact() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer id="contact" className="bg-soft border-t border-line transition-colors duration-500">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-10">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mut">05 — Contact</span>
        </Reveal>

        <h2 className="mt-8 font-display font-extrabold uppercase tracking-tight leading-[0.95] text-[clamp(2.6rem,8vw,7rem)]">
          <Reveal>
            <span className="block">Ready to learn.</span>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="block text-outline">Ready to work.</span>
          </Reveal>
        </h2>

        <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8 justify-between">
          <Reveal delay={0.2}>
            <div>
              <a href={`mailto:${profile.email}`} className="link-sweep font-mono text-sm md:text-base tracking-wide">
                {profile.email}
              </a>
              <div className="mt-2 flex items-center gap-2 font-mono text-xs text-mut">
                <Phone size={12} />
                {profile.phone}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 bg-fg text-bg px-8 py-4 font-mono text-xs uppercase tracking-[0.25em]"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-16 flex items-center gap-4">
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-11 h-11 grid place-items-center border border-line hover:border-fg hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>

        <div className="mt-16 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
          <span>© {year} {profile.name}</span>
          <span>Designed & built with Next.js</span>
          <a href="#top" className="flex items-center gap-2 hover:text-fg transition-colors">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}

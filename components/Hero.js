"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import Clock from "./Clock";
import ScrambleText from "./ScrambleText";

const mask = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.12 },
  }),
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  // Keep the hero readable during long mobile scrolls.

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div style={{ y }} className="relative max-w-[1240px] mx-auto w-full px-6 md:px-10 pt-36 pb-16">
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mut mb-10 md:mb-16"
        >
          <span>Portfolio © 2026</span>
          <span className="hidden sm:inline">/</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fg opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fg" />
            </span>
            {profile.availability}
          </span>
          <span className="hidden sm:inline">/</span>
          <Clock />
        </motion.div>

        <h1 className="font-display font-extrabold leading-[0.9] tracking-tight text-[clamp(2.15rem,9.5vw,8.5rem)] uppercase">
          <span className="block overflow-hidden">
            <motion.span custom={0} variants={mask} initial={false} animate="show" className="block">
              {profile.firstName}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={1} variants={mask} initial={false} animate="show" className="block text-outline">
              {profile.lastName}
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <ScrambleText
              text={profile.role}
              delay={1100}
              className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-mut"
            />
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-mut"
            >
              {profile.tagline}
            </motion.p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 font-mono text-[11px] uppercase tracking-widest">View projects <ArrowUpRight size={14} /></a>
              <a href={profile.resumeUrl} className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-widest">Download CV <Download size={14} /></a>
            </div>
          </div>

          <motion.a
            href="#work"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mut hover:text-fg transition-colors w-fit"
          >
            Explore my work
            <span className="relative h-10 w-px bg-line overflow-hidden">
              <motion.span
                className="absolute top-0 left-0 w-px h-4 bg-fg"
                animate={{ y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div style={{ y, opacity }} className="relative max-w-[1240px] mx-auto w-full px-6 md:px-10 pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
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

        <h1 className="font-display font-extrabold leading-[0.9] tracking-tight text-[clamp(2.8rem,10.5vw,9.5rem)] uppercase">
          <span className="block overflow-hidden">
            <motion.span custom={0} variants={mask} initial="hidden" animate="show" className="block">
              {profile.firstName}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={1} variants={mask} initial="hidden" animate="show" className="block text-outline">
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-mut"
            >
              {profile.tagline}
            </motion.p>
          </div>

          <motion.a
            href="#work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mut hover:text-fg transition-colors w-fit"
          >
            Scroll to explore
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

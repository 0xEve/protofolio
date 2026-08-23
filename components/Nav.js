"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import Cli from "@/components/Cli";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur backdrop-blur-md border-b border-line" : "border-b border-transparent"
        }`}
      >
        <nav className="max-w-[1240px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <span className="w-9 h-9 grid place-items-center border border-fg font-display font-bold text-sm group-hover:bg-fg group-hover:text-bg transition-colors duration-300">
              {profile.initials}
            </span>
            <span className="hidden sm:block font-mono text-xs uppercase tracking-[0.25em]">
              {profile.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-sweep font-mono text-xs uppercase tracking-[0.2em] text-mut hover:text-fg transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Cli />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-9 h-9 grid place-items-center border border-line"
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-bg flex flex-col"
          >
            <div className="h-16 px-6 flex items-center justify-between border-b border-line">
              <span className="font-mono text-xs uppercase tracking-[0.25em]">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 grid place-items-center border border-line"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-6 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold text-4xl md:text-5xl py-3 border-b border-line flex items-center justify-between"
                >
                  {l.label}
                  <ArrowUpRight size={28} className="text-mut" />
                </motion.a>
              ))}
            </div>
            <div className="px-6 py-6 border-t border-line font-mono text-xs text-mut uppercase tracking-[0.2em]">
              {profile.email}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

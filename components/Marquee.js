"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Marquee({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-line bg-soft py-4 transition-colors duration-500 ${className}`}>
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-mono text-xs uppercase tracking-[0.3em] text-mut">
            {item}
            <ArrowUpRight size={13} className="text-fg" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

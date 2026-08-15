"use client";
import { motion } from "framer-motion";

export default function TextReveal({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {"\u00A0"}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

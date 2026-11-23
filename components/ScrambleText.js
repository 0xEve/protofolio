"use client";
import { useEffect, useState } from "react";

import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%";

export default function ScrambleText({ text, delay = 0, className = "" }) {
  const [output, setOutput] = useState(text);

  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) { setOutput(text); return; }
    let raf;
    const start = performance.now() + delay;
    const perChar = 45;
    const tick = (now) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - start) / (text.length * perChar), 1);
      const revealed = Math.floor(progress * text.length);
      let result = text.slice(0, revealed);
      for (let i = revealed; i < text.length; i++) {
        result += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(result);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, reducedMotion]);

  return <span className={className} aria-label={text}><span aria-hidden="true">{output}</span></span>;
}

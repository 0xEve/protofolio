"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  ArrowUpRight,
  Bug,
  Download,
  FolderGit2,
  Github,
  HelpCircle,
  Linkedin,
  Mail,
  RefreshCw,
  ShieldAlert,
  Share2,
  SunMoon,
  Terminal,
  User,
} from "lucide-react";
import { profile } from "@/data/profile";

const COMMANDS = [
  { name: "/help", action: "help", desc: "List every command", icon: HelpCircle },
  { name: "/projects", action: "projects", desc: "Jump to projects", icon: FolderGit2 },
  { name: "/download-cv", action: "cv", desc: "Download resume PDF", icon: Download },
  { name: "/contact-me", action: "contact", desc: "Go to contact section", icon: Mail },
  { name: "/socials", action: "socials", desc: "Reveal social links", icon: Share2 },
  { name: "/theme", action: "theme", desc: "Toggle dark / light mode", icon: SunMoon },
  { name: "/refresh", action: "refresh", desc: "Soft-reset the page", icon: RefreshCw },
  { name: "/whoami", action: "whoami", desc: "Who is behind this site", icon: User },
  { name: "/hack", action: "hack", desc: "Run a totally legal scan", icon: Bug },
  { name: "/sudo", action: "sudo", desc: "Attempt privilege escalation", icon: ShieldAlert },
];

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, mail: Mail };

function scoreMatch(query, target) {
  if (!query) return -1;
  if (target === query) return 1000;
  if (target.startsWith(query)) return 900 - (target.length - query.length);
  let qi = 0;
  let score = 0;
  let streak = false;
  for (let ti = 0; ti < target.length && qi < query.length; ti += 1) {
    if (target[ti] === query[qi]) {
      score += streak ? 3 : 1;
      streak = true;
      qi += 1;
    } else {
      streak = false;
    }
  }
  return qi === query.length ? 500 + score : -1;
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function suggestFor(raw) {
  const v = raw.trim().toLowerCase();
  if (!v.startsWith("/")) return null;
  let best = null;
  let bestScore = -1;
  for (const cmd of COMMANDS) {
    const s = scoreMatch(v, cmd.name);
    if (s > bestScore) {
      bestScore = s;
      best = cmd;
    }
  }
  if (bestScore > 0) return best;
  let fallback = null;
  let bestEd = Infinity;
  for (const cmd of COMMANDS) {
    const d = editDistance(v, cmd.name);
    if (d < bestEd) {
      bestEd = d;
      fallback = cmd;
    }
  }
  return bestEd <= 3 ? fallback : null;
}

export default function Cli() {
  const [value, setValue] = useState("");
  const [ghost, setGhost] = useState("");
  const [chip, setChip] = useState(null);
  const [panel, setPanel] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [veil, setVeil] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const idRef = useRef(0);
  const timersRef = useRef([]);
  const shake = useAnimationControls();

  const panelItems = useMemo(() => {
    if (panel === "help") return COMMANDS;
    if (panel === "socials") return profile.socials;
    return [];
  }, [panel]);

  const later = useCallback((fn, delay) => {
    const tmr = window.setTimeout(fn, delay);
    timersRef.current.push(tmr);
    return tmr;
  }, []);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("ai-theme") === "light") {
        document.documentElement.classList.add("light");
        setIsLight(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setPanel(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    ({ title, lines = [], ttl = 4000 }) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((ts) => [...ts.slice(-2), { id, title, lines }]);
      if (ttl) later(() => dismissToast(id), ttl);
      return id;
    },
    [dismissToast, later]
  );

  const updateToast = useCallback((id, patch) => {
    setToasts((ts) =>
      ts.map((t) => (t.id === id ? { ...t, ...(typeof patch === "function" ? patch(t) : patch) } : t))
    );
  }, []);

  const scrollToSection = useCallback((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("light");
    root.classList.toggle("light", next);
    setIsLight(next);
    try {
      window.localStorage.setItem("ai-theme", next ? "light" : "dark");
    } catch {}
  }, []);

  const softRefresh = useCallback(() => {
    setVeil(true);
    later(() => {
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = prev;
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      later(() => setVeil(false), 140);
    }, 420);
  }, [later]);

  const downloadCv = useCallback(() => {
    const a = document.createElement("a");
    a.href = profile.resumeUrl;
    a.download = "Abdelrhman-Islam-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    pushToast({ title: "$ curl -O resume.pdf", lines: ["download started"], ttl: 3000 });
  }, [pushToast]);

  const runHack = useCallback(() => {
    const seq = [
      [500, "[*] target acquired: localhost:1337"],
      [1050, "[+] scanning ports... 3 open"],
      [1600, "[!] CVE-2026-0001 verified"],
      [2150, "ACCESS GRANTED - relax, demo only"],
    ];
    const id = pushToast({ title: "$ ./hack --target localhost", lines: ["[*] initializing ev_hunter v2.6"], ttl: null });
    seq.forEach(([delay, line], i) => {
      later(() => updateToast(id, (t) => ({ ...t, lines: [...t.lines, line] })), delay);
      if (i === seq.length - 1) later(() => dismissToast(id), 4400);
    });
  }, [dismissToast, later, pushToast, updateToast]);

  const togglePanel = useCallback((mode) => {
    setPanel((p) => (p === mode ? null : mode));
    setActive(0);
  }, []);

  const runAction = useCallback(
    (action) => {
      switch (action) {
        case "help":
          setError(null);
          togglePanel("help");
          break;
        case "socials":
          setError(null);
          togglePanel("socials");
          break;
        case "projects":
          setPanel(null);
          scrollToSection("#work");
          break;
        case "contact":
          setPanel(null);
          scrollToSection("#contact");
          break;
        case "cv":
          setPanel(null);
          downloadCv();
          break;
        case "theme":
          setPanel(null);
          toggleTheme();
          break;
        case "refresh":
          setPanel(null);
          softRefresh();
          break;
        case "whoami":
          setPanel(null);
          pushToast({
            title: "$ whoami",
            lines: [
              "abdelrhman-islam",
              `role: ${profile.role}`,
              `loc: ${profile.location} - ${profile.timezone}`,
              `status: ${profile.availability}`,
            ],
            ttl: 5200,
          });
          break;
        case "hack":
          setPanel(null);
          runHack();
          break;
        case "sudo":
          setPanel(null);
          pushToast({
            title: "$ sudo escalate --privileges",
            lines: ["permission denied: nice try."],
            ttl: 4000,
          });
          break;
        default:
          break;
      }
    },
    [downloadCv, pushToast, runHack, scrollToSection, softRefresh, togglePanel, toggleTheme]
  );

  const completeWith = useCallback((name) => {
    setValue(name);
    setGhost("");
    setChip(null);
    setError(null);
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) el.setSelectionRange(name.length, name.length);
    });
  }, []);

  const execute = useCallback(
    (raw) => {
      const input = raw.trim().toLowerCase();
      if (!input) return;
      const cmd = COMMANDS.find((c) => c.name === input);
      if (!cmd) {
        const sug = suggestFor(input);
        setError({ suggest: sug && sug.name !== input ? sug.name : null });
        shake.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.35 } });
        later(() => setError(null), 4200);
        return;
      }
      setValue("");
      setGhost("");
      setChip(null);
      setError(null);
      runAction(cmd.action);
    },
    [later, runAction, shake]
  );

  const onChange = useCallback((e) => {
    const v = e.target.value;
    setValue(v);
    setError(null);
    setPanel(null);
    const sug = suggestFor(v);
    const rawLower = v.toLowerCase();
    if (sug && rawLower.trim() && sug.name.startsWith(rawLower) && sug.name !== rawLower) {
      setGhost(sug.name.slice(rawLower.length));
      setChip(null);
    } else if (sug && rawLower.trim() && sug.name !== rawLower.trim()) {
      setGhost("");
      setChip(sug.name);
    } else {
      setGhost("");
      setChip(null);
    }
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (panel) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((i) => (i + 1) % panelItems.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((i) => (i - 1 + panelItems.length) % panelItems.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const item = panelItems[active];
          if (!item) return;
          if (panel === "help") runAction(item.action);
          else window.open(item.url, "_blank", "noopener,noreferrer");
        } else if (e.key === "Escape") {
          e.preventDefault();
          setPanel(null);
        } else if (e.key === "Tab") {
          e.preventDefault();
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setValue("");
        setGhost("");
        setChip(null);
        setError(null);
      } else if (e.key === "Tab") {
        const target = ghost ? value + ghost : chip;
        if (target) {
          e.preventDefault();
          completeWith(target);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        execute(value);
      }
    },
    [active, chip, completeWith, execute, ghost, panel, panelItems, runAction, value]
  );

  const listId = panel ? "cli-listbox" : undefined;

  return (
    <>
      <div ref={wrapRef} className="relative hidden md:block">
        <motion.div animate={shake}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              execute(value);
            }}
            noValidate
          >
            <div
              className={`flex items-center gap-2 h-9 w-[210px] lg:w-[250px] xl:w-[280px] rounded-full border bg-soft/80 pl-3.5 pr-2 font-mono text-xs transition-shadow duration-300 ${
                error ? "border-red-400/60" : panel ? "border-accent cli-ring" : "border-line"
              }`}
            >
              <Terminal size={13} className="shrink-0 text-accent" aria-hidden="true" />
              <div className="relative grid flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  value={value}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  placeholder="Type / for commands"
                  aria-label="Command line"
                  aria-autocomplete="list"
                  aria-expanded={Boolean(panel)}
                  aria-controls={listId}
                  aria-activedescendant={panel ? `cli-opt-${active}` : undefined}
                  spellCheck="false"
                  autoComplete="off"
                  className="z-10 col-start-1 row-start-1 w-full h-6 bg-transparent font-mono text-xs leading-6 text-fg placeholder:text-mut/70 outline-none caret-accent"
                />
                {ghost && (
                  <span
                    aria-hidden="true"
                    className="col-start-1 row-start-1 flex items-center h-6 font-mono text-xs leading-6 whitespace-pre overflow-hidden pointer-events-none text-fg/30"
                  >
                    <span className="invisible">{value}</span>
                    {ghost}
                  </span>
                )}
              </div>
              {chip && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => completeWith(chip)}
                  className="shrink-0 max-w-[110px] truncate rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-accent hover:border-accent transition-colors"
                  title={`Did you mean ${chip}?`}
                >
                  {chip}
                </button>
              )}
              {!value && !chip && (
                <kbd className="hidden xl:block shrink-0 mr-0.5 rounded border border-line px-1.5 py-0.5 text-[10px] text-mut">
                  /
                </kbd>
              )}
            </div>
          </form>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              role="status"
              aria-live="polite"
              className="absolute right-0 top-11 z-50 whitespace-nowrap rounded-lg border border-line bg-soft/95 backdrop-blur px-3 py-2 font-mono text-[11px] text-mut shadow-xl"
            >
              command not found
              {error.suggest && (
                <>
                  {" - did you mean "}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => completeWith(error.suggest)}
                    className="text-accent neon-text hover:underline underline-offset-2"
                  >
                    {error.suggest}
                  </button>
                  ?
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {panel && (
            <motion.ul
              id="cli-listbox"
              role="listbox"
              aria-label={panel === "help" ? "Available commands" : "Social links"}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 top-12 z-50 w-[320px] xl:w-[360px] origin-top rounded-xl border border-line bg-soft/95 backdrop-blur-md p-1.5 shadow-2xl"
            >
              {panel === "help" &&
                COMMANDS.map((cmd, i) => (
                  <li key={cmd.name} id={`cli-opt-${i}`} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => runAction(cmd.action)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        i === active ? "bg-fg/[0.07]" : ""
                      }`}
                    >
                      <cmd.icon size={15} className={i === active ? "text-accent" : "text-mut"} aria-hidden="true" />
                      <span className="font-mono text-xs text-accent neon-text">{cmd.name}</span>
                      <span className="ml-auto truncate text-[11px] text-mut">{cmd.desc}</span>
                    </button>
                  </li>
                ))}
              {panel === "socials" &&
                profile.socials.map((s, i) => {
                  const Icon = SOCIAL_ICONS[s.icon] || Share2;
                  return (
                    <li key={s.label} id={`cli-opt-${i}`} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => window.open(s.url, "_blank", "noopener,noreferrer")}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          i === active ? "bg-fg/[0.07]" : ""
                        }`}
                      >
                        <Icon size={15} className={i === active ? "text-accent" : "text-mut"} aria-hidden="true" />
                        <span className="font-mono text-xs text-accent neon-text">{s.label}</span>
                        <span className="ml-auto flex min-w-0 items-center gap-1 text-[11px] text-mut">
                          <span className="truncate">{s.url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                          <ArrowUpRight size={12} className="shrink-0" />
                        </span>
                      </button>
                    </li>
                  );
                })}
              <li aria-hidden="true" className="mt-1 border-t border-line px-3 pt-2 pb-1 font-mono text-[10px] text-mut">
                up/down navigate - enter select - esc close
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => setSheet(true)}
        aria-label="Open command menu"
        aria-haspopup="dialog"
        aria-expanded={sheet}
        className="md:hidden w-9 h-9 grid place-items-center border border-line text-accent"
      >
        <Terminal size={16} />
      </button>

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSheet(false)}
              className="fixed inset-0 z-[80] bg-bg/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              tabIndex={-1}
              autoFocus
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={(e) => e.key === "Escape" && setSheet(false)}
              className="fixed inset-x-0 bottom-0 z-[85] max-h-[72vh] overflow-y-auto rounded-t-2xl border-t border-line bg-soft p-5 pb-8 md:hidden"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-mut">
                  <Terminal size={14} className="text-accent" />
                  Commands
                </span>
                <button
                  type="button"
                  onClick={() => setSheet(false)}
                  aria-label="Close command menu"
                  className="w-8 h-8 grid place-items-center border border-line"
                >
                  <span className="font-mono text-xs">esc</span>
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {COMMANDS.filter((c) => c.action !== "help" && c.action !== "socials").map((cmd) => (
                  <button
                    key={cmd.name}
                    type="button"
                    onClick={() => {
                      setSheet(false);
                      runAction(cmd.action);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-left active:bg-fg/[0.06]"
                  >
                    <cmd.icon size={15} className="text-accent" aria-hidden="true" />
                    <span className="font-mono text-xs text-accent">{cmd.name}</span>
                    <span className="ml-auto truncate text-[11px] text-mut">{cmd.desc}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 mb-1 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-mut">
                Socials
              </div>
              <div className="flex flex-col gap-1">
                {profile.socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon] || Share2;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 active:bg-fg/[0.06]"
                    >
                      <Icon size={15} className="text-accent" aria-hidden="true" />
                      <span className="font-mono text-xs text-accent">{s.label}</span>
                      <ArrowUpRight size={13} className="ml-auto text-mut" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[95] flex flex-col items-end gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto min-w-[270px] max-w-[360px] rounded-xl border border-line bg-soft/95 backdrop-blur px-4 py-3 font-mono text-xs shadow-2xl"
            >
              <div className="text-accent neon-text">$ {t.title.replace(/^\$\s*/, "")}</div>
              <div className="mt-1.5 flex flex-col gap-0.5">
                {t.lines.map((ln, i) => (
                  <div
                    key={i}
                    className={
                      ln.startsWith("ACCESS")
                        ? "text-accent neon-text mt-1"
                        : ln.startsWith("[")
                          ? "text-mut"
                          : "text-fg"
                    }
                  >
                    {ln}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {veil && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-bg grid place-items-center pointer-events-none"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-mut">
              <RefreshCw size={14} className="text-accent animate-spin" />
              resetting session
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only" aria-live="polite">
        {isLight ? "Light theme" : "Dark theme"} enabled
      </span>
    </>
  );
}

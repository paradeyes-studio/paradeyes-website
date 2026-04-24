"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "paradeyes_theme";

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    const plausible = (window as PlausibleWindow).plausible;
    if (typeof plausible === "function") {
      plausible("theme_switched", { props: { to: newTheme } });
    }
  };

  if (!mounted) return <div className="w-8 h-8" aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"}
      aria-pressed={theme === "dark"}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full",
        "transition-all duration-300 ease-out",
        "hover:bg-white/10",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57eea1]",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex text-white/40 hover:text-white"
        >
          {theme === "light" ? (
            <Moon className="w-[14px] h-[14px]" aria-hidden="true" />
          ) : (
            <Sun className="w-[14px] h-[14px]" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

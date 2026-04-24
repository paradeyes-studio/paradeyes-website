"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

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
    const resolved: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", resolved);
    // Legitimate external-to-React sync (localStorage + matchMedia).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(resolved);
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

  if (!mounted) {
    return <div className="pdy-theme-switch" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"}
      aria-pressed={theme === "dark"}
      className="pdy-theme-switch"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex"
        >
          {theme === "light" ? (
            <Moon aria-hidden="true" />
          ) : (
            <Sun aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

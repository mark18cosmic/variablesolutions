"use client";

import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kms-theme";

/**
 * Flips `data-theme` on <html>. Which icon shows is driven entirely by CSS
 * off that attribute, so there's no React state to hydrate and no flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // private browsing — the toggle still works for this session
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-muted-strong transition-colors duration-300 hover:border-mint/40 hover:text-mint-ink",
        className
      )}
    >
      <span className="theme-icon theme-icon-sun">
        <Sun size={17} />
      </span>
      <span className="theme-icon theme-icon-moon">
        <Moon size={17} />
      </span>
    </button>
  );
}

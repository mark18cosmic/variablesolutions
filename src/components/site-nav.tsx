"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { openStartProject } from "@/components/start-project";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Apps", href: "#apps" },
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock the page behind the mobile sheet
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-10">
        <a href="#top" aria-label="KMSolutions home" className="shrink-0">
          <Wordmark markSize={36} />
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-muted-strong transition-colors duration-300 hover:text-mint-ink"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-mint transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <ThemeToggle />
          <Button
            variant="solid"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={openStartProject}
          >
            Start a project
          </Button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-foreground transition-colors duration-300 hover:border-mint-ink/40 hover:text-mint-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* scroll progress */}
      <motion.div
        className="h-0.5 origin-left bg-mint"
        style={{ scaleX: scrollYProgress }}
        aria-hidden
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col px-5 py-3 sm:px-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--line)] py-3.5 text-sm font-medium text-muted-strong transition-colors last:border-b-0 hover:text-mint-ink"
                >
                  {l.label}
                </a>
              ))}
              <Button
                variant="solid"
                size="default"
                className="mt-4 mb-2 w-full"
                onClick={() => {
                  setOpen(false);
                  openStartProject();
                }}
              >
                Start a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

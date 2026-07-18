"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#process" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[var(--hairline)] bg-[rgba(4,18,11,0.72)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" aria-label="Variable Solutions home">
          <Wordmark markSize={38} />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium tracking-wide text-sage transition-colors duration-300 hover:text-sage-gold"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <Button asChild variant="outline" size="sm">
            <a href="#contact">Start a project</a>
          </Button>
        </div>

        <button
          className="text-sage-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--hairline)] bg-[rgba(4,18,11,0.95)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm tracking-wide text-sage transition-colors hover:text-sage-gold"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Start a project
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

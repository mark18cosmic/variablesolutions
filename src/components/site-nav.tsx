"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || open
          ? "border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-10">
        <a href="#top" aria-label="KMSolutions home" className="shrink-0">
          <Wordmark markSize={32} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-strong transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
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
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur lg:hidden">
          <div className="flex flex-col px-5 py-3 sm:px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--line)] py-3.5 text-sm font-medium text-muted-strong last:border-b-0"
              >
                {l.label}
              </a>
            ))}
            <Button
              variant="solid"
              className="mt-4 mb-2 w-full"
              onClick={() => {
                setOpen(false);
                openStartProject();
              }}
            >
              Start a project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

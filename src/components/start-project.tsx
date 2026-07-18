"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, X, Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EVENT = "start-project:open";
const ease = [0.22, 1, 0.36, 1] as const;

/** Any button/link can open the enquiry modal via this event. */
export function openStartProject() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

/** Drop-in replacement for the "Start a project" buttons. */
export function StartProjectButton({
  children = "Start a project",
  className,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      className={cn("group", className)}
      onClick={openStartProject}
    >
      {children}
      <ArrowRight
        size={18}
        className="transition-transform duration-500 group-hover:translate-x-1"
      />
    </Button>
  );
}

const budgets = ["< $5k", "$5k–15k", "$15k–50k", "$50k+", "Not sure yet"];

type Status = "idle" | "saving" | "done" | "error";

export function StartProjectModal() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  const [budget, setBudget] = React.useState<string>("");

  React.useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setError("");
      setBudget("");
      setOpen(true);
    };
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("saving");
    setError("");

    try {
      const res = await fetch("/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          budget,
          idea: data.get("idea"),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-[rgba(2,10,6,0.72)] backdrop-blur-md"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-[var(--hairline)] bg-[var(--background-2)] shadow-[0_-20px_80px_-30px_rgba(246,226,122,0.35)] sm:rounded-3xl"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
          >
            <div
              className="guilloche pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(246,226,122,0.6)] to-transparent"
              aria-hidden
            />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] text-sage transition-colors hover:border-[var(--hairline-strong)] hover:text-sage-gold"
            >
              <X size={16} />
            </button>

            <div className="relative max-h-[88vh] overflow-y-auto p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-sage-gold"
                    >
                      <Check size={28} />
                    </motion.div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      Idea received.
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-sage">
                      Your enquiry has been logged. We&apos;ll be in touch shortly
                      — thank you for thinking of us.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-7"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-sage-gold/85">
                      Start a project
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                      Tell us the idea.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-sage">
                      No pitch needed — a few lines is plenty. We read every one.
                    </p>

                    <form onSubmit={onSubmit} className="mt-7 space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field name="name" label="Name" placeholder="Your name" required />
                        <Field
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                      <Field
                        name="company"
                        label="Company"
                        placeholder="Optional"
                      />

                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-sage">
                          Budget
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {budgets.map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setBudget(b)}
                              className={cn(
                                "rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition-all duration-300",
                                budget === b
                                  ? "border-[var(--hairline-strong)] bg-[rgba(214,184,92,0.1)] text-sage-gold"
                                  : "border-[var(--hairline)] text-sage hover:text-sage-gold"
                              )}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="idea"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-sage"
                        >
                          The idea
                        </label>
                        <textarea
                          id="idea"
                          name="idea"
                          required
                          rows={4}
                          placeholder="What are you trying to build or solve?"
                          className="w-full resize-none rounded-xl border border-[var(--hairline)] bg-[rgba(4,18,11,0.6)] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-sage/50 focus:border-[var(--hairline-strong)]"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-red-300/90">{error}</p>
                      )}

                      <Button
                        type="submit"
                        variant="solid"
                        size="lg"
                        className="group w-full"
                        disabled={status === "saving"}
                      >
                        {status === "saving" ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Saving…
                          </>
                        ) : (
                          <>
                            Send it over
                            <ArrowRight
                              size={18}
                              className="transition-transform duration-500 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  ...props
}: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-sage"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="w-full rounded-xl border border-[var(--hairline)] bg-[rgba(4,18,11,0.6)] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-sage/50 focus:border-[var(--hairline-strong)]"
      />
    </div>
  );
}

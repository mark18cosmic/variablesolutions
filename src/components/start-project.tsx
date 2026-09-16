"use client";

import * as React from "react";
import { ArrowRight, Check, X, Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EVENT = "start-project:open";

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
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-[var(--overlay)]"
        onClick={() => setOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-project-heading"
        className="relative w-full max-w-lg overflow-hidden rounded-t-2xl border border-[var(--line)] bg-background sm:rounded-2xl"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] text-muted transition-colors hover:text-foreground"
        >
          <X size={16} />
        </button>

        <div className="max-h-[88vh] overflow-y-auto p-7 sm:p-9">
          {status === "done" ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-on-mint">
                <Check size={26} />
              </div>
              <h3
                id="start-project-heading"
                className="text-2xl font-semibold tracking-tight text-foreground"
              >
                Idea received.
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Your enquiry has been logged. We&apos;ll be in touch shortly —
                thank you for thinking of us.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-7"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <h3
                id="start-project-heading"
                className="text-2xl font-semibold leading-tight tracking-tight text-foreground"
              >
                Tell us the idea.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
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
                <Field name="company" label="Company" placeholder="Optional" />

                <div>
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-muted">
                    Budget
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        aria-pressed={budget === b}
                        onClick={() => setBudget(b)}
                        className={cn(
                          "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                          budget === b
                            ? "border-mint text-mint-ink"
                            : "border-[var(--line)] text-muted hover:text-foreground"
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
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-muted"
                  >
                    The idea
                  </label>
                  <textarea
                    id="idea"
                    name="idea"
                    required
                    rows={4}
                    placeholder="What are you trying to build or solve?"
                    className="w-full resize-none rounded-lg border border-[var(--line)] bg-background-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-mint"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="w-full"
                  disabled={status === "saving"}
                >
                  {status === "saving" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Send it over"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
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
        className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="w-full rounded-lg border border-[var(--line)] bg-background-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-mint"
      />
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-mint" />
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-mint">
        {children}
      </span>
    </div>
  );
}

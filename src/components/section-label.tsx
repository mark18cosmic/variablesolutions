import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-ink">
        {children}
      </span>
    </div>
  );
}

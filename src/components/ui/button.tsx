import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-normal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Mint-filled primary CTA, dark text — works on both themes.
        // The shadow is a coloured halo rather than a drop shadow, which
        // is what makes it read as lit rather than raised.
        solid:
          "bg-gradient-to-r from-mint to-[#3ff0c9] text-[#0b1310] font-semibold shadow-[0_8px_30px_-8px_rgba(46,230,168,0.65)] hover:shadow-[0_12px_44px_-8px_rgba(46,230,168,0.85)] hover:brightness-105",
        outline:
          "glass text-foreground hover:border-mint/50 hover:text-mint-ink",
        ghost: "text-muted-strong hover:text-mint-ink bg-transparent",
        link: "text-mint-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

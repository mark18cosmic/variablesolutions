import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-mid/60 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Gold-outlined primary CTA
        outline:
          "border border-[rgba(214,184,92,0.55)] text-sage-gold bg-transparent hover:border-[rgba(246,226,122,0.9)] hover:text-white hover:shadow-[0_0_0_1px_rgba(214,184,92,0.25),0_20px_60px_-24px_rgba(246,226,122,0.55)] hover:bg-[rgba(214,184,92,0.06)]",
        solid:
          "bg-gold-gradient text-[#1a1206] font-semibold hover:shadow-[0_18px_50px_-18px_rgba(246,226,122,0.7)] hover:brightness-105",
        ghost:
          "text-sage hover:text-sage-gold bg-transparent",
        link: "text-sage-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-5",
        lg: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "outline",
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

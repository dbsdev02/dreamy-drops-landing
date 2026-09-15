import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" && "bg-primary text-primary-foreground shadow-magic hover:-translate-y-0.5 hover:shadow-magic-lg",
          variant === "secondary" && "border border-primary/20 bg-background/70 text-foreground backdrop-blur-sm hover:bg-background",
          variant === "ghost" && "text-foreground hover:bg-primary/10",
          variant === "icon" && "border border-border bg-background/70 text-foreground hover:bg-primary/10",
          size === "sm" && "h-9 px-4 text-xs",
          size === "md" && "h-11 px-6 text-sm",
          size === "lg" && "h-14 px-8 text-sm",
          size === "icon" && "size-10 p-0",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
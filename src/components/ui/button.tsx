import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const button = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-3 rounded-full font-display font-bold tracking-[0.01em] transition-[background-color,box-shadow,transform,color] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-yellow-500 text-navy-800 hover:bg-yellow-600 hover:shadow-glow",
        secondary: "bg-navy-800 text-white hover:bg-navy-700",
        outline: "border-2 border-navy-800/80 text-navy-800 hover:bg-navy-800 hover:text-white",
        "outline-light": "border-2 border-white/30 text-white hover:border-white hover:bg-white/10",
        ghost: "text-navy-800 hover:bg-navy-100",
        whatsapp: "bg-whatsapp text-ink hover:brightness-95",
      },
      size: {
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-7 text-base",
      },
      withArrow: { true: "pr-2", false: "" },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "lg", withArrow: false, full: false },
  },
);

type ButtonVariants = VariantProps<typeof button>;

function Arrow({ variant }: { variant: ButtonVariants["variant"] }) {
  const dark = variant === "primary" || variant === "whatsapp";
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 place-items-center rounded-full transition-transform duration-300 ease-out-quint group-hover/btn:-rotate-45",
        dark ? "bg-navy-800 text-yellow-500" : "bg-yellow-500 text-navy-800",
      )}
    >
      <ArrowRight className="size-[18px]" strokeWidth={2.25} />
    </span>
  );
}

type Common = ButtonVariants & { children: ReactNode; className?: string };

export function Button({
  variant,
  size,
  withArrow,
  full,
  className,
  children,
  ...props
}: Common & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(button({ variant, size, withArrow, full }), className)} {...props}>
      <span>{children}</span>
      {withArrow && <Arrow variant={variant} />}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  withArrow,
  full,
  className,
  children,
  ...props
}: Common & ComponentPropsWithoutRef<"a">) {
  return (
    <a className={cn(button({ variant, size, withArrow, full }), className)} {...props}>
      <span>{children}</span>
      {withArrow && <Arrow variant={variant} />}
    </a>
  );
}

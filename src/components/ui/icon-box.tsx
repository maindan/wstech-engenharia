import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function IconBox({
  icon: Icon,
  theme = "light",
  className,
}: {
  icon: LucideIcon;
  theme?: "light" | "dark" | "alert";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-[18px] transition-colors duration-300",
        theme === "light" && "bg-navy-100 text-navy-800 group-hover:bg-yellow-500",
        theme === "dark" && "bg-navy-700 text-yellow-500",
        theme === "alert" && "bg-yellow-500 text-navy-900",
        className,
      )}
    >
      <Icon className="size-7" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

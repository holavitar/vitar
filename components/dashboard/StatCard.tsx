import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  highlight?: boolean;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 border flex flex-col gap-4 transition-shadow duration-200 hover:shadow-md",
        highlight
          ? "bg-[#11325b] border-[#11325b]"
          : "bg-white border-gray-100 shadow-sm"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center",
            highlight ? "bg-white/10" : "bg-[#11325b]/6"
          )}
        >
          <Icon size={18} className={highlight ? "text-[#e7ba61]" : "text-[#11325b]"} />
        </div>
        {trend && trendLabel && (
          <span
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5 rounded-full",
              trend === "up"
                ? "bg-emerald-50 text-emerald-600"
                : trend === "down"
                ? "bg-red-50 text-[#ac1c37]"
                : "bg-gray-50 text-gray-500"
            )}
          >
            {trendLabel}
          </span>
        )}
      </div>

      <div>
        <div
          className={cn(
            "text-2xl font-bold leading-none mb-1",
            highlight ? "text-white" : "text-[#11325b]"
          )}
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          {value}
        </div>
        <div
          className={cn(
            "text-xs font-medium",
            highlight ? "text-white/70" : "text-gray-500"
          )}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className={cn(
              "text-[10px] mt-0.5",
              highlight ? "text-white/40" : "text-gray-400"
            )}
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

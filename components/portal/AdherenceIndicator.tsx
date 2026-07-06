import { cn } from "@/lib/utils";

interface AdherenceIndicatorProps {
  pct: number;
  taken: number;
  total: number;
}

export function AdherenceIndicator({ pct, taken, total }: AdherenceIndicatorProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  const color =
    pct >= 80 ? "#11325b" : pct >= 60 ? "#e7ba61" : "#ac1c37";

  const label =
    pct >= 80 ? "Excelente" : pct >= 60 ? "Regular" : "Crítica";

  const labelColor =
    pct >= 80
      ? "text-[#11325b]"
      : pct >= 60
      ? "text-[#9a7520]"
      : "text-[#ac1c37]";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-6">
      {/* Ring */}
      <div className="relative flex-shrink-0">
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="10"
          />
          {/* Progress */}
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 64 64)"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn("font-bold text-2xl leading-none", labelColor)}
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {pct}%
          </span>
          <span
            className="text-gray-400 text-[9px] mt-0.5"
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
          >
            adherencia
          </span>
        </div>
      </div>

      {/* Text */}
      <div>
        <div
          className={cn("font-bold text-lg mb-1", labelColor)}
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          {label}
        </div>
        <p
          className="text-gray-500 text-xs leading-relaxed mb-3"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          {total > 0
            ? `Tomaste ${taken} de ${total} medicaciones en los últimos 30 días.`
            : "Aún no hay registros de medicación."}
        </p>
        {pct < 80 && (
          <div
            className={cn(
              "inline-flex text-xs px-3 py-1.5 rounded-lg font-medium",
              pct < 60
                ? "bg-[#ac1c37]/8 text-[#ac1c37]"
                : "bg-[#e7ba61]/15 text-[#9a7520]"
            )}
          >
            {pct < 60
              ? "⚠ Tu médico fue notificado"
              : "Intentá mejorar tu adherencia esta semana"}
          </div>
        )}
      </div>
    </div>
  );
}

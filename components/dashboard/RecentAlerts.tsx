import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Alert } from "@/types";

interface AlertWithPatient extends Alert {
  patient_name: string;
}

interface RecentAlertsProps {
  alerts: AlertWithPatient[];
}

const PRIORITY_CONFIG = {
  high:   { label: "Alta",  dot: "bg-[#ac1c37]",  badge: "bg-[#ac1c37]/10 text-[#ac1c37]" },
  medium: { label: "Media", dot: "bg-[#e7ba61]",   badge: "bg-[#e7ba61]/20 text-[#9a7520]" },
  low:    { label: "Baja",  dot: "bg-gray-300",    badge: "bg-gray-100 text-gray-500" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `Hace ${minutes} min`;
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${Math.floor(hours / 24)} días`;
}

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <h3
          className="font-bold text-[#11325b] text-sm"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Alertas recientes
        </h3>
        <Link
          href="/dashboard/alerts"
          className="text-xs text-[#11325b]/60 hover:text-[#11325b] transition-colors font-medium"
        >
          Ver todas →
        </Link>
      </div>

      <div className="divide-y divide-gray-50">
        {alerts.map((alert) => {
          const cfg = PRIORITY_CONFIG[alert.priority] ?? PRIORITY_CONFIG.low;
          return (
            <div key={alert.id} className="px-5 py-3.5 flex items-start gap-3">
              <span className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", cfg.dot)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[#11325b] text-xs truncate">
                    {alert.patient_name}
                  </span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                    {timeAgo(alert.created_at)}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5 truncate" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                  {alert.type}
                </p>
              </div>
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0", cfg.badge)}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="px-5 py-8 text-center text-gray-400 text-sm">
          Sin alertas activas.
        </div>
      )}
    </div>
  );
}

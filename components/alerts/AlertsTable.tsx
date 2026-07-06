import Link from "next/link";
import { cn } from "@/lib/utils";
import { ResolveAlertButton } from "./ResolveAlertButton";
import type { AlertWithPatient } from "@/lib/services/alerts";

interface AlertsTableProps {
  alerts: AlertWithPatient[];
  showResolved: boolean;
}

const PRIORITY_CONFIG = {
  high:   { label: "Alta",  rowClass: "border-l-2 border-l-[#ac1c37]", badge: "bg-[#ac1c37]/10 text-[#ac1c37]",  dot: "bg-[#ac1c37]" },
  medium: { label: "Media", rowClass: "border-l-2 border-l-[#e7ba61]", badge: "bg-[#e7ba61]/20 text-[#9a7520]",  dot: "bg-[#e7ba61]" },
  low:    { label: "Baja",  rowClass: "",                               badge: "bg-gray-100 text-gray-500",       dot: "bg-gray-300" },
};

const STATUS_CONFIG = {
  active:   { label: "Activa",   classes: "bg-[#ac1c37]/8 text-[#ac1c37]" },
  resolved: { label: "Resuelta", classes: "bg-emerald-50 text-emerald-700" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 60)  return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export function AlertsTable({ alerts, showResolved }: AlertsTableProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
        <p className="text-gray-400 text-sm">
          {showResolved ? "No hay alertas resueltas." : "No hay alertas activas. ¡Todo en orden!"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              {["Paciente", "Motivo", "Prioridad", "Estado", "Fecha", ""].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                  style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {alerts.map((alert) => {
              const priority = PRIORITY_CONFIG[alert.priority] ?? PRIORITY_CONFIG.low;
              const status   = STATUS_CONFIG[alert.status] ?? STATUS_CONFIG.active;
              return (
                <tr
                  key={alert.id}
                  className={cn(
                    "hover:bg-gray-50/50 transition-colors",
                    priority.rowClass
                  )}
                >
                  {/* Paciente */}
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/patients/${alert.patient_id}`}
                      className="font-semibold text-[#11325b] text-sm hover:underline"
                    >
                      {alert.patient_name}
                    </Link>
                  </td>

                  {/* Motivo */}
                  <td className="px-5 py-4 max-w-xs">
                    <span
                      className="text-gray-600 text-xs"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                    >
                      {alert.type}
                    </span>
                  </td>

                  {/* Prioridad */}
                  <td className="px-5 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full", priority.badge)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", priority.dot)} />
                      {priority.label}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-5 py-4">
                    <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full", status.classes)}>
                      {status.label}
                    </span>
                  </td>

                  {/* Fecha */}
                  <td className="px-5 py-4">
                    <span
                      className="text-gray-400 text-xs"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                    >
                      {timeAgo(alert.created_at)}
                    </span>
                  </td>

                  {/* Acción */}
                  <td className="px-5 py-4">
                    {alert.status === "active" && (
                      <ResolveAlertButton alertId={alert.id} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Patient } from "@/types";

interface RiskTableProps {
  patients: Patient[];
}

const RISK_LABELS: Record<string, { label: string; className: string }> = {
  high:   { label: "Alto",  className: "bg-[#ac1c37]/10 text-[#ac1c37]" },
  medium: { label: "Medio", className: "bg-[#e7ba61]/20 text-[#9a7520]" },
  low:    { label: "Bajo",  className: "bg-emerald-50 text-emerald-700" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export function RiskTable({ patients }: RiskTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <h3
          className="font-bold text-[#11325b] text-sm"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Pacientes con mayor riesgo
        </h3>
        <Link
          href="/dashboard/patients"
          className="text-xs text-[#11325b]/60 hover:text-[#11325b] transition-colors font-medium"
        >
          Ver todos →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              {["Nombre", "Condición", "Adherencia", "Riesgo", "Última actividad"].map((col) => (
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
            {patients.map((patient) => {
              const risk = RISK_LABELS[patient.risk] ?? RISK_LABELS.low;
              return (
                <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/patients/${patient.id}`}
                      className="font-semibold text-[#11325b] text-sm hover:underline"
                    >
                      {patient.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-gray-600 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            patient.adherence < 60
                              ? "bg-[#ac1c37]"
                              : patient.adherence < 80
                              ? "bg-[#e7ba61]"
                              : "bg-[#11325b]"
                          )}
                          style={{ width: `${patient.adherence}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-bold",
                          patient.adherence < 60
                            ? "text-[#ac1c37]"
                            : patient.adherence < 80
                            ? "text-[#9a7520]"
                            : "text-[#11325b]"
                        )}
                      >
                        {patient.adherence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("text-[10px] font-semibold px-2 py-1 rounded-full", risk.className)}>
                      {risk.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-gray-400 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                      {timeAgo(patient.created_at)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {patients.length === 0 && (
        <div className="px-5 py-10 text-center text-gray-400 text-sm">
          No hay pacientes en riesgo actualmente.
        </div>
      )}
    </div>
  );
}

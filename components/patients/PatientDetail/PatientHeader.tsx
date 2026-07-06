import Link from "next/link";
import { ArrowLeft, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Patient } from "@/types";

interface PatientHeaderProps {
  patient: Patient;
}

const RISK_CONFIG = {
  high:   { label: "Alto riesgo",  classes: "bg-[#ac1c37]/10 text-[#ac1c37]",  icon: AlertTriangle },
  medium: { label: "Riesgo medio", classes: "bg-[#e7ba61]/20 text-[#9a7520]",  icon: AlertCircle },
  low:    { label: "Bajo riesgo",  classes: "bg-emerald-50 text-emerald-700",   icon: CheckCircle },
};

export function PatientHeader({ patient }: PatientHeaderProps) {
  const risk = RISK_CONFIG[patient.risk] ?? RISK_CONFIG.low;
  const RiskIcon = risk.icon;

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const adherenceColor =
    patient.adherence < 60
      ? "text-[#ac1c37]"
      : patient.adherence < 80
      ? "text-[#9a7520]"
      : "text-emerald-600";

  const barColor =
    patient.adherence < 60
      ? "bg-[#ac1c37]"
      : patient.adherence < 80
      ? "bg-[#e7ba61]"
      : "bg-emerald-500";

  return (
    <div className="space-y-4">
      {/* Back */}
      <Link
        href="/dashboard/patients"
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#11325b] transition-colors"
        style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
      >
        <ArrowLeft size={13} />
        Volver a pacientes
      </Link>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Avatar grande */}
          <div className="w-16 h-16 rounded-2xl bg-[#11325b] flex items-center justify-center flex-shrink-0">
            <span className="text-[#e7ba61] font-bold text-xl">{initials}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1
                className="text-xl font-bold text-[#11325b]"
                style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {patient.name}
              </h1>
              <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full", risk.classes)}>
                <RiskIcon size={10} />
                {risk.label}
              </span>
            </div>
            <p
              className="text-gray-500 text-sm mb-4"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              {patient.condition}
            </p>

            {/* Adherencia inline */}
            <div className="flex items-center gap-3">
              <div className="flex-1 max-w-xs bg-gray-100 rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full", barColor)}
                  style={{ width: `${patient.adherence}%` }}
                />
              </div>
              <span className={cn("font-bold text-lg", adherenceColor)}>
                {patient.adherence}%
              </span>
              <span className="text-gray-400 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                adherencia
              </span>
            </div>
          </div>

          {/* Stats rápidos */}
          <div className="flex sm:flex-col gap-3 sm:gap-2 sm:items-end text-right">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                Registro desde
              </div>
              <div className="text-xs font-semibold text-[#11325b] mt-0.5">
                {new Date(patient.created_at).toLocaleDateString("es-AR", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

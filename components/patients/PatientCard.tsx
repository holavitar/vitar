import Link from "next/link";
import { ChevronRight, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
}

const RISK_CONFIG = {
  high:   { label: "Alto riesgo",   classes: "bg-[#ac1c37]/10 text-[#ac1c37]",        icon: AlertTriangle,  iconColor: "text-[#ac1c37]" },
  medium: { label: "Riesgo medio",  classes: "bg-[#e7ba61]/20 text-[#9a7520]",        icon: AlertCircle,    iconColor: "text-[#e7ba61]" },
  low:    { label: "Bajo riesgo",   classes: "bg-emerald-50 text-emerald-700",         icon: CheckCircle,    iconColor: "text-emerald-500" },
};

function AdherenceBar({ value }: { value: number }) {
  const color =
    value < 60 ? "bg-[#ac1c37]" : value < 80 ? "bg-[#e7ba61]" : "bg-[#11325b]";
  const textColor =
    value < 60 ? "text-[#ac1c37]" : value < 80 ? "text-[#9a7520]" : "text-[#11325b]";

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div
          className={cn("h-1.5 rounded-full transition-all", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={cn("text-xs font-bold w-8 text-right", textColor)}>
        {value}%
      </span>
    </div>
  );
}

export function PatientCard({ patient }: PatientCardProps) {
  const risk = RISK_CONFIG[patient.risk] ?? RISK_CONFIG.low;
  const RiskIcon = risk.icon;

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/dashboard/patients/${patient.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#11325b]/15 transition-all duration-200 p-5 group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#11325b]/8 flex items-center justify-center flex-shrink-0">
          <span className="text-[#11325b] font-bold text-sm">{initials}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h3 className="font-bold text-[#11325b] text-sm truncate group-hover:underline">
              {patient.name}
            </h3>
            <ChevronRight
              size={15}
              className="text-gray-300 group-hover:text-[#11325b] transition-colors flex-shrink-0"
            />
          </div>

          <p
            className="text-gray-500 text-xs mb-3 truncate"
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
          >
            {patient.condition}
          </p>

          <AdherenceBar value={patient.adherence} />

          <div className="flex items-center justify-between mt-3">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full",
                risk.classes
              )}
            >
              <RiskIcon size={10} />
              {risk.label}
            </span>
            <span
              className="text-[10px] text-gray-400"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              Ver detalle →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

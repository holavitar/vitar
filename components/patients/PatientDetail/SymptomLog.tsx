import { Activity } from "lucide-react";
import type { Symptom } from "@/types";

interface SymptomLogProps {
  symptoms: Symptom[];
}

const SYMPTOM_LABELS: Record<string, { label: string; color: string }> = {
  dolor:   { label: "Dolor",   color: "bg-[#ac1c37]/10 text-[#ac1c37]" },
  fatiga:  { label: "Fatiga",  color: "bg-[#e7ba61]/20 text-[#9a7520]" },
  mareos:  { label: "Mareos",  color: "bg-blue-50 text-blue-700" },
  otro:    { label: "Otro",    color: "bg-gray-100 text-gray-600" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "Hace menos de 1 hora";
  if (hours < 24) return `Hace ${hours} h`;
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export function SymptomLog({ symptoms }: SymptomLogProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
        <Activity size={15} className="text-[#11325b]" />
        <h2
          className="font-bold text-[#11325b] text-sm"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Síntomas registrados
        </h2>
      </div>

      {symptoms.length === 0 ? (
        <div className="px-5 py-10 text-center text-gray-400 text-sm">
          Sin síntomas registrados recientemente.
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {symptoms.map((symptom) => {
            const cfg = SYMPTOM_LABELS[symptom.type] ?? SYMPTOM_LABELS.otro;
            return (
              <div key={symptom.id} className="px-5 py-3.5 flex items-start gap-3">
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 mt-0.5 ${cfg.color}`}
                >
                  {cfg.label}
                </span>
                <div className="flex-1 min-w-0">
                  {symptom.notes && (
                    <p
                      className="text-gray-600 text-xs"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                    >
                      {symptom.notes}
                    </p>
                  )}
                  <p
                    className="text-gray-400 text-[10px] mt-0.5"
                    style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                  >
                    {timeAgo(symptom.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

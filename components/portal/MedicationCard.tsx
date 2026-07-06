import { Clock, RefreshCw } from "lucide-react";
import { MarkTakenButton } from "./MarkTakenButton";
import type { Medication } from "@/types";

interface MedicationCardProps {
  medication: Medication;
  patientId: string;
  takenToday: boolean;
}

export function MedicationCard({
  medication,
  patientId,
  takenToday,
}: MedicationCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-[#11325b] text-sm">{medication.name}</h3>
            <span className="bg-[#11325b]/8 text-[#11325b] text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {medication.dose}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span
              className="flex items-center gap-1 text-xs text-gray-400"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              <Clock size={11} />
              {medication.schedule}
            </span>
            <span
              className="flex items-center gap-1 text-xs text-gray-400"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              <RefreshCw size={11} />
              {medication.frequency}
            </span>
          </div>
        </div>

        {/* Status dot */}
        <div
          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${
            takenToday ? "bg-emerald-400" : "bg-gray-200"
          }`}
        />
      </div>

      {/* Action */}
      <MarkTakenButton
        medicationId={medication.id}
        patientId={patientId}
        alreadyTaken={takenToday}
      />
    </div>
  );
}

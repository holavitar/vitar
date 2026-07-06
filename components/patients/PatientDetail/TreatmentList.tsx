import { Pill, Clock, RefreshCw } from "lucide-react";
import type { Medication } from "@/types";

interface TreatmentListProps {
  medications: Medication[];
}

export function TreatmentList({ medications }: TreatmentListProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h2
          className="font-bold text-[#11325b] text-sm"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Tratamiento actual
        </h2>
        <p
          className="text-gray-400 text-xs mt-0.5"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          {medications.length} medicamento{medications.length !== 1 ? "s" : ""} prescripto{medications.length !== 1 ? "s" : ""}
        </p>
      </div>

      {medications.length === 0 ? (
        <div className="px-5 py-10 text-center text-gray-400 text-sm">
          Sin medicamentos registrados.
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {medications.map((med) => (
            <div key={med.id} className="px-5 py-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#11325b]/6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Pill size={16} className="text-[#11325b]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#11325b] text-sm">{med.name}</span>
                  <span className="bg-[#11325b]/8 text-[#11325b] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {med.dose}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span
                    className="flex items-center gap-1 text-xs text-gray-500"
                    style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                  >
                    <Clock size={11} className="text-gray-400" />
                    {med.schedule}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs text-gray-500"
                    style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                  >
                    <RefreshCw size={11} className="text-gray-400" />
                    {med.frequency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

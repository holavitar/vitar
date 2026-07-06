import { PatientCard } from "./PatientCard";
import { Users } from "lucide-react";
import type { Patient } from "@/types";

interface PatientListProps {
  patients: Patient[];
  query: string;
}

export function PatientList({ patients, query }: PatientListProps) {
  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-[#11325b]/6 flex items-center justify-center">
          <Users size={22} className="text-[#11325b]/40" />
        </div>
        <p className="font-semibold text-[#11325b] text-sm">
          {query ? `Sin resultados para "${query}"` : "Sin pacientes cargados"}
        </p>
        <p
          className="text-gray-400 text-xs max-w-xs"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          {query
            ? "Probá con otro nombre o condición."
            : "Los pacientes aparecerán aquí una vez que sean cargados en el sistema."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}

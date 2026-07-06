import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PatientTopBar } from "@/components/portal/PatientTopBar";
import { MedicationCard } from "@/components/portal/MedicationCard";
import {
  getPatientProfile,
  getPatientMedications,
  getTodayLogs,
} from "@/lib/services/portal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mi tratamiento" };

export default async function TreatmentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const patient = await getPatientProfile(user.id);
  if (!patient) redirect("/login");

  const [medications, todayLogs] = await Promise.all([
    getPatientMedications(patient.id),
    getTodayLogs(patient.id),
  ]);

  const takenIds = new Set(todayLogs.map((l) => l.medication_id));

  const takenCount   = medications.filter((m) => takenIds.has(m.id)).length;
  const pendingCount = medications.length - takenCount;

  return (
    <>
      <PatientTopBar
        title="Mi tratamiento"
        subtitle={`${medications.length} medicamento${medications.length !== 1 ? "s" : ""} prescripto${medications.length !== 1 ? "s" : ""}`}
      />

      <main className="flex-1 p-6 space-y-5 overflow-auto">

        {/* Progreso del día */}
        <div className="bg-[#11325b] rounded-2xl p-5 flex items-center gap-5">
          <div className="flex-1">
            <div
              className="text-white font-bold text-base mb-1"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              {pendingCount === 0
                ? "¡Completaste todas las tomas de hoy!"
                : `Te faltan ${pendingCount} toma${pendingCount !== 1 ? "s" : ""} de hoy`}
            </div>
            <div
              className="text-white/55 text-xs"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              {takenCount} de {medications.length} medicamentos tomados
            </div>
          </div>
          {/* Mini progress bar */}
          <div className="w-24 flex-shrink-0">
            <div className="flex justify-between text-white/60 text-[10px] mb-1">
              <span>{takenCount}</span>
              <span>{medications.length}</span>
            </div>
            <div className="w-full bg-white/15 rounded-full h-2">
              <div
                className="bg-[#e7ba61] h-2 rounded-full transition-all"
                style={{
                  width: medications.length > 0
                    ? `${(takenCount / medications.length) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Lista de medicamentos */}
        {medications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center text-gray-400 text-sm">
            No tenés medicamentos registrados.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {medications.map((med) => (
              <MedicationCard
                key={med.id}
                medication={med}
                patientId={patient.id}
                takenToday={takenIds.has(med.id)}
              />
            ))}
          </div>
        )}

      </main>
    </>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PatientTopBar } from "@/components/portal/PatientTopBar";
import { SymptomForm } from "@/components/portal/SymptomForm";
import { getPatientProfile } from "@/lib/services/portal";
import { getPatientSymptoms } from "@/lib/services/patients";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Síntomas" };

const SYMPTOM_LABELS: Record<string, { label: string; color: string }> = {
  dolor:  { label: "Dolor",  color: "bg-[#ac1c37]/10 text-[#ac1c37]" },
  fatiga: { label: "Fatiga", color: "bg-[#e7ba61]/20 text-[#9a7520]" },
  mareos: { label: "Mareos", color: "bg-blue-50 text-blue-700" },
  otro:   { label: "Otro",   color: "bg-gray-100 text-gray-600" },
};

function timeAgo(dateStr: string) {
  const diff  = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (hours < 1)  return "Hace menos de 1 hora";
  if (hours < 24) return `Hace ${hours} h`;
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export default async function SymptomsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const patient = await getPatientProfile(user.id);
  if (!patient) redirect("/login");

  const symptoms = await getPatientSymptoms(patient.id);

  return (
    <>
      <PatientTopBar
        title="Síntomas"
        subtitle="Registrá cómo te sentís para que tu médico lo sepa"
      />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* Formulario */}
          <SymptomForm patientId={patient.id} />

          {/* Historial */}
          {symptoms.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-50">
                <h2
                  className="font-bold text-[#11325b] text-sm"
                  style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                  Síntomas registrados
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {symptoms.map((s) => {
                  const cfg = SYMPTOM_LABELS[s.type] ?? SYMPTOM_LABELS.otro;
                  return (
                    <div key={s.id} className="px-5 py-3.5 flex items-start gap-3">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5 ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        {s.notes && (
                          <p
                            className="text-gray-700 text-xs"
                            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                          >
                            {s.notes}
                          </p>
                        )}
                        <p
                          className="text-gray-400 text-[10px] mt-0.5"
                          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                        >
                          {timeAgo(s.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}

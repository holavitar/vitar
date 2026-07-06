import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PatientTopBar } from "@/components/portal/PatientTopBar";
import { AdherenceIndicator } from "@/components/portal/AdherenceIndicator";
import { MedicationCard } from "@/components/portal/MedicationCard";
import {
  getPatientProfile,
  getPatientMedications,
  getTodayLogs,
  getAdherenceSummary,
} from "@/lib/services/portal";
import { getConversation } from "@/lib/services/messages";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inicio" };

export default async function PatientHomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const patient = await getPatientProfile(user.id);
  if (!patient) redirect("/login");

  const [medications, todayLogs, adherence] = await Promise.all([
    getPatientMedications(patient.id),
    getTodayLogs(patient.id),
    getAdherenceSummary(patient.id),
  ]);

  const takenIds = new Set(todayLogs.map((l) => l.medication_id));

  // Institución: buscar el user con rol institution de la misma institución
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("institution_id", patient.institution_id)
    .eq("role", "institution")
    .single();

  const instUser = data as { id?: string } | null;

  const recentMessages = instUser?.id
    ? await getConversation(user.id, instUser.id)
    : [];
  const lastMessages = recentMessages.slice(-3);

  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long",
  });

  const pending = medications.filter((m) => !takenIds.has(m.id));
  const done    = medications.filter((m) => takenIds.has(m.id));

  return (
    <>
      <PatientTopBar
        title={`Hola, ${patient.name.split(" ")[0]}`}
        subtitle={today.charAt(0).toUpperCase() + today.slice(1)}
      />

      <main className="flex-1 p-6 space-y-5 overflow-auto">

        {/* Adherencia */}
        <AdherenceIndicator
          pct={adherence.pct}
          taken={adherence.taken}
          total={adherence.total}
        />

        {/* Medicaciones pendientes hoy */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2
              className="font-bold text-[#11325b] text-sm"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              Medicación de hoy
            </h2>
            <Link
              href="/portal/treatment"
              className="text-xs text-[#11325b]/60 hover:text-[#11325b] transition-colors"
            >
              Ver todas →
            </Link>
          </div>

          {pending.length === 0 && done.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-10 text-center text-gray-400 text-sm">
              Sin medicamentos registrados.
            </div>
          ) : (
            <div className="space-y-3">
              {pending.length === 0 ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-700 text-sm font-medium flex items-center gap-2">
                  <span className="text-lg">🎉</span>
                  ¡Tomaste todas tus medicaciones de hoy!
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {pending.map((med) => (
                    <MedicationCard
                      key={med.id}
                      medication={med}
                      patientId={patient.id}
                      takenToday={false}
                    />
                  ))}
                </div>
              )}

              {done.length > 0 && pending.length > 0 && (
                <div>
                  <p
                    className="text-xs text-gray-400 mb-2"
                    style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                  >
                    Ya tomadas hoy
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {done.map((med) => (
                      <MedicationCard
                        key={med.id}
                        medication={med}
                        patientId={patient.id}
                        takenToday={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Últimos mensajes */}
        {lastMessages.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#11325b]" />
                <h2
                  className="font-bold text-[#11325b] text-sm"
                  style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                  Mensajes recientes
                </h2>
              </div>
              <Link
                href="/portal/messages"
                className="text-xs text-[#11325b]/60 hover:text-[#11325b] transition-colors"
              >
                Ver chat →
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {lastMessages.map((msg) => {
                const isMe = msg.sender_id === user.id;
                return (
                  <div key={msg.id} className="px-5 py-3 flex gap-3 items-start">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${
                        isMe
                          ? "bg-[#e7ba61] text-[#11325b]"
                          : "bg-[#11325b] text-white"
                      }`}
                    >
                      {isMe ? "Vos" : "M"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-gray-700 text-xs truncate"
                        style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                      >
                        {msg.content}
                      </p>
                      <p className="text-gray-400 text-[10px] mt-0.5">
                        {new Date(msg.created_at).toLocaleTimeString("es-AR", {
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </>
  );
}

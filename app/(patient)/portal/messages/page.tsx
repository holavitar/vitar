import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PatientTopBar } from "@/components/portal/PatientTopBar";
import { ChatWindow } from "@/components/messages/ChatWindow";
import { getPatientProfile } from "@/lib/services/portal";
import { getConversation } from "@/lib/services/messages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mensajes" };

export default async function PatientMessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const patient = await getPatientProfile(user.id);
  if (!patient) redirect("/login");

  const { data } = await supabase
    .from("users")
    .select("id, name")
    .eq("institution_id", patient.institution_id)
    .eq("role", "institution")
    .single();

  const instUser = data as {
    id?: string;
    name?: string | null;
  } | null;

  const messages = instUser?.id
    ? await getConversation(user.id, instUser.id)
    : [];

  return (
    <>
      <PatientTopBar title="Mensajes" subtitle="Chat con tu equipo médico" />

      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {instUser?.id ? (
            <ChatWindow
              currentUserId={user.id}
              currentUserName={patient.name}
              patientId={instUser.id}
              patientName={instUser.name ?? "Equipo médico"}
              initialMessages={messages}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              No hay equipo médico asignado todavía.
            </div>
          )}
        </div>
      </main>
    </>
  );
}

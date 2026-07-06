import { redirect } from "next/navigation";
import { Suspense } from "react";
import { MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/dashboard/TopBar";
import { ContactList } from "@/components/messages/ContactList";
import { ChatWindow } from "@/components/messages/ChatWindow";
import {
  getPatientContacts,
  getConversation,
} from "@/lib/services/messages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mensajes" };

interface PageProps {
  searchParams: Promise<{ patient?: string }>;
}

export default async function MessagesPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("users")
    .select("institution_id, name")
    .eq("id", user.id)
    .single();

  const profile = data as {
    institution_id?: string;
    name?: string | null;
  } | null;

  const institutionId = profile?.institution_id;

  if (!institutionId) redirect("/login");

  const { patient: selectedPatientId } = await searchParams;

  const [contacts, messages] = await Promise.all([
    getPatientContacts(institutionId),
    selectedPatientId
      ? getConversation(user.id, selectedPatientId)
      : Promise.resolve([]),
  ]);

  const selectedContact = contacts.find((c) => c.id === selectedPatientId);

  return (
    <>
      <TopBar title="Mensajes" subtitle="Chat con pacientes" />

      <main className="flex-1 flex overflow-hidden">
        {/* Contact list */}
        <Suspense fallback={null}>
          <ContactList contacts={contacts} selectedId={selectedPatientId} />
        </Suspense>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedContact ? (
            <ChatWindow
              currentUserId={user.id}
              currentUserName={profile.name ?? "Institución"}
              patientId={selectedContact.id}
              patientName={selectedContact.name}
              initialMessages={messages}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#f2f2f2]">
              <div className="w-14 h-14 rounded-2xl bg-[#11325b]/8 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} className="text-[#11325b]/40" />
              </div>
              <p className="font-semibold text-[#11325b] text-sm mb-1">
                Seleccioná un paciente
              </p>
              <p
                className="text-gray-400 text-xs max-w-xs"
                style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
              >
                Elegí un contacto de la lista para iniciar o continuar una conversación.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

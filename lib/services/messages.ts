import { createClient } from "@/lib/supabase/client";
import type { Message } from "@/types";

export type MessageWithSender = Message & { sender_name: string };

export interface PatientContact {
  /** patients.id — estable, se usa como parámetro de URL. */
  id: string;
  name: string;
  condition: string;
  /**
   * users.id del paciente (destino real de los mensajes). Es null si el
   * paciente todavía no activó su portal, en cuyo caso no es contactable.
   */
  userId: string | null;
  /** Vista previa del último mensaje de la conversación con la institución. */
  lastMessage: string | null;
  lastAt: string | null;
}

/**
 * Devuelve la conversación entre dos usuarios (ambos identificados por
 * users.id), ordenada cronológicamente y con el nombre del emisor resuelto.
 */
export async function getConversation(
  userId: string,
  otherId: string
): Promise<MessageWithSender[]> {
  const supabase = createClient();

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`
    )
    .order("created_at", { ascending: true });

  if (!messages || messages.length === 0) return [];

  const senderIds = [...new Set(messages.map((m) => m.sender_id))];
  const { data: users } = await supabase
    .from("users")
    .select("id, name")
    .in("id", senderIds);

  const nameMap = Object.fromEntries((users ?? []).map((u) => [u.id, u.name]));

  return messages.map((m) => ({
    ...m,
    sender_name: nameMap[m.sender_id] ?? "Desconocido",
  }));
}

/**
 * Lista los pacientes de la institución como contactos de mensajería. Resuelve
 * el users.id de cada paciente (destino real del chat) y agrega la vista previa
 * del último mensaje intercambiado con la institución.
 */
export async function getPatientContacts(
  institutionId: string,
  institutionUserId: string
): Promise<PatientContact[]> {
  const supabase = createClient();

  const [{ data: patients }, { data: patientUsers }, { data: messages }] =
    await Promise.all([
      supabase
        .from("patients")
        .select("id, name, condition")
        .eq("institution_id", institutionId)
        .order("name"),
      supabase
        .from("users")
        .select("id, name")
        .eq("institution_id", institutionId)
        .eq("role", "patient"),
      supabase
        .from("messages")
        .select("sender_id, receiver_id, content, created_at")
        .or(
          `sender_id.eq.${institutionUserId},receiver_id.eq.${institutionUserId}`
        )
        .order("created_at", { ascending: true }),
    ]);

  // name → users.id del paciente (mismo criterio de vínculo que el portal)
  const userIdByName = new Map(
    (patientUsers ?? []).map((u) => [u.name, u.id])
  );

  // último mensaje por interlocutor (users.id del otro extremo)
  const lastByUser = new Map<string, { content: string; created_at: string }>();
  for (const m of messages ?? []) {
    const other =
      m.sender_id === institutionUserId ? m.receiver_id : m.sender_id;
    lastByUser.set(other, { content: m.content, created_at: m.created_at });
  }

  return (patients ?? []).map((p) => {
    const userId = userIdByName.get(p.name) ?? null;
    const last = userId ? lastByUser.get(userId) ?? null : null;
    return {
      id: p.id,
      name: p.name,
      condition: p.condition,
      userId,
      lastMessage: last?.content ?? null,
      lastAt: last?.created_at ?? null,
    };
  });
}

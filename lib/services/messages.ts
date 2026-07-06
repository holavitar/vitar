import { createClient } from "@/lib/supabase/client";
import type { Message } from "@/types";

export type MessageWithSender = Message & { sender_name: string };

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

export async function getPatientContacts(
  institutionId: string
): Promise<{ id: string; name: string; condition: string }[]> {
  const supabase = createClient();

  const { data } = await supabase
    .from("patients")
    .select("id, name, condition")
    .eq("institution_id", institutionId)
    .order("name");

  return data ?? [];
}

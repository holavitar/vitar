"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage(
  senderId: string,
  receiverId: string,
  content: string
): Promise<{ error?: string }> {
  if (!content.trim()) return { error: "El mensaje no puede estar vacío" };

  const supabase = await createClient();

  const { error } = await supabase.from("messages").insert({
    sender_id: senderId,
    receiver_id: receiverId,
    content: content.trim(),
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/messages");
  revalidatePath("/portal/messages");
  return {};
}

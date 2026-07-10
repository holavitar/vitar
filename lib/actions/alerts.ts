"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function resolveAlert(alertId: string): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("alerts")
    .update({ status: "resolved" })
    .eq("id", alertId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/alerts");
  revalidatePath("/dashboard");
  return {};
}

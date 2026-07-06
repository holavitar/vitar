"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markMedicationTaken(
  medicationId: string,
  patientId: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("medication_logs").insert({
    medication_id: medicationId,
    patient_id: patientId,
    taken_at: new Date().toISOString(),
    status: "taken",
  });

  if (error) return { error: error.message };

  revalidatePath("/portal");
  revalidatePath("/portal/treatment");
  return {};
}

export async function registerSymptom(
  patientId: string,
  type: string,
  notes: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("symptoms").insert({
    patient_id: patientId,
    type,
    notes: notes || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/portal/symptoms");
  return {};
}

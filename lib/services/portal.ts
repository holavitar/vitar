import { createClient } from "@/lib/supabase/server";
import type { Medication, MedicationLog, Patient } from "@/types";

export async function getPatientProfile(userId: string): Promise<Patient | null> {
  const supabase = await createClient();

  const { data: userRow } = await supabase
    .from("users")
    .select("name, institution_id")
    .eq("id", userId)
    .single();

  if (!userRow) return null;

  const { data } = await supabase
    .from("patients")
    .select("*")
    .eq("institution_id", userRow.institution_id!)
    .eq("name", userRow.name)
    .single();

  return data ?? null;
}

export async function getPatientMedications(
  patientId: string
): Promise<Medication[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("medications")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: true });

  return data ?? [];
}

export async function getTodayLogs(patientId: string): Promise<MedicationLog[]> {
  const supabase = await createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("medication_logs")
    .select("*")
    .eq("patient_id", patientId)
    .gte("taken_at", today.toISOString());

  return data ?? [];
}

export async function getAdherenceSummary(patientId: string): Promise<{
  pct: number;
  taken: number;
  total: number;
}> {
  const supabase = await createClient();

  const since = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data } = await supabase
    .from("medication_logs")
    .select("status")
    .eq("patient_id", patientId)
    .gte("taken_at", since);

  const logs  = data ?? [];
  const total = logs.length;
  const taken = logs.filter((l) => l.status === "taken").length;
  const pct   = total > 0 ? Math.round((taken / total) * 100) : 100;

  return { pct, taken, total };
}

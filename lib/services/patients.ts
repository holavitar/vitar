import { createClient } from "@/lib/supabase/server";
import type { Patient, Medication, Symptom, MedicationLog } from "@/types";

export async function getPatients(institutionId: string): Promise<Patient[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("institution_id", institutionId)
    .order("adherence", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPatientById(
  patientId: string,
  institutionId: string
): Promise<Patient | null> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("patients")
    .select("*")
    .eq("id", patientId)
    .eq("institution_id", institutionId)
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

export async function getPatientSymptoms(
  patientId: string
): Promise<Symptom[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("symptoms")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false })
    .limit(10);

  return data ?? [];
}

export async function getAdherenceLogs(
  patientId: string
): Promise<MedicationLog[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("medication_logs")
    .select("*")
    .eq("patient_id", patientId)
    .gte(
      "taken_at",
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    )
    .order("taken_at", { ascending: true });

  return data ?? [];
}

// Agrupa logs por día para el historial de adherencia
export function groupLogsByDay(
  logs: MedicationLog[]
): { date: string; taken: number; total: number; pct: number }[] {
  const byDay: Record<string, { taken: number; total: number }> = {};

  for (const log of logs) {
    const day = log.taken_at.slice(0, 10);
    if (!byDay[day]) byDay[day] = { taken: 0, total: 0 };
    byDay[day].total++;
    if (log.status === "taken") byDay[day].taken++;
  }

  return Object.entries(byDay).map(([date, { taken, total }]) => ({
    date,
    taken,
    total,
    pct: total > 0 ? Math.round((taken / total) * 100) : 0,
  }));
}

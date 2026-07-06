import { createClient } from "@/lib/supabase/server";
import type { Alert } from "@/types";

export type AlertWithPatient = Alert & { patient_name: string };

export async function getAlerts(
  institutionId: string,
  status?: "active" | "resolved"
): Promise<AlertWithPatient[]> {
  const supabase = await createClient();

  const { data: patients } = await supabase
    .from("patients")
    .select("id, name")
    .eq("institution_id", institutionId);

  const patientMap = Object.fromEntries(
    (patients ?? []).map((p) => [p.id, p.name])
  );

  const ids = Object.keys(patientMap);
  if (ids.length === 0) return [];

  let query = supabase
    .from("alerts")
    .select("*")
    .in("patient_id", ids)
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data } = await query;

  return (data ?? []).map((a) => ({
    ...a,
    patient_name: patientMap[a.patient_id] ?? "Desconocido",
  }));
}

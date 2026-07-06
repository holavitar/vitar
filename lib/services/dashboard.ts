import { createClient } from "@/lib/supabase/server";
import type { DashboardKPIs, AdherenceDataPoint, Patient, Alert } from "@/types";

export async function getDashboardKPIs(institutionId: string): Promise<DashboardKPIs> {
  const supabase = await createClient();

  const [patientsRes, alertsRes] = await Promise.all([
    supabase
      .from("patients")
      .select("adherence")
      .eq("institution_id", institutionId),
    supabase
      .from("alerts")
      .select("id")
      .eq("status", "active")
      .in(
        "patient_id",
        (await supabase
          .from("patients")
          .select("id")
          .eq("institution_id", institutionId)
        ).data?.map((p) => p.id) ?? []
      ),
  ]);

  const patients = patientsRes.data ?? [];
  const activeAlerts = alertsRes.data?.length ?? 0;

  const avgAdherence =
    patients.length > 0
      ? Math.round(
          patients.reduce((sum, p) => sum + p.adherence, 0) / patients.length
        )
      : 0;

  // Internaciones evitadas: estimación basada en pacientes con adherencia ≥ 80%
  const avoideRehospitalizations = patients.filter((p) => p.adherence >= 80).length;

  return {
    totalPatients: patients.length,
    averageAdherence: avgAdherence,
    activeAlerts,
    avoideRehospitalizations,
  };
}

export async function getAdherenceTrend(institutionId: string): Promise<AdherenceDataPoint[]> {
  const supabase = await createClient();

  // Obtener logs de los últimos 30 días agrupados por día
  const { data: patientIds } = await supabase
    .from("patients")
    .select("id")
    .eq("institution_id", institutionId);

  const ids = patientIds?.map((p) => p.id) ?? [];
  if (ids.length === 0) return getFallbackTrend();

  const { data: logs } = await supabase
    .from("medication_logs")
    .select("taken_at, status")
    .in("patient_id", ids)
    .gte("taken_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .order("taken_at", { ascending: true });

  if (!logs || logs.length === 0) return getFallbackTrend();

  // Agrupar por día
  const byDay: Record<string, { total: number; taken: number }> = {};
  for (const log of logs) {
    const day = log.taken_at.slice(0, 10);
    if (!byDay[day]) byDay[day] = { total: 0, taken: 0 };
    byDay[day].total++;
    if (log.status === "taken") byDay[day].taken++;
  }

  return Object.entries(byDay).map(([date, { total, taken }]) => ({
    date,
    adherence: Math.round((taken / total) * 100),
  }));
}

export async function getHighRiskPatients(institutionId: string): Promise<Patient[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("patients")
    .select("*")
    .eq("institution_id", institutionId)
    .in("risk", ["high", "medium"])
    .order("adherence", { ascending: true })
    .limit(6);

  return data ?? [];
}

export async function getRecentAlerts(institutionId: string): Promise<(Alert & { patient_name: string })[]> {
  const supabase = await createClient();

  const { data: patientIds } = await supabase
    .from("patients")
    .select("id, name")
    .eq("institution_id", institutionId);

  const idMap = Object.fromEntries(
    (patientIds ?? []).map((p) => [p.id, p.name])
  );

  const { data } = await supabase
    .from("alerts")
    .select("*")
    .in("patient_id", Object.keys(idMap))
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(5);

  return (data ?? []).map((a) => ({
    ...a,
    patient_name: idMap[a.patient_id] ?? "Desconocido",
  }));
}

// Datos de fallback para cuando no hay logs reales todavía
function getFallbackTrend(): AdherenceDataPoint[] {
  const days = 30;
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (days - 1 - i));
    return {
      date: d.toISOString().slice(0, 10),
      adherence: Math.round(65 + Math.random() * 25),
    };
  });
}

import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/dashboard/TopBar";
import { PatientHeader } from "@/components/patients/PatientDetail/PatientHeader";
import { TreatmentList } from "@/components/patients/PatientDetail/TreatmentList";
import { AdherenceHistory } from "@/components/patients/PatientDetail/AdherenceHistory";
import { SymptomLog } from "@/components/patients/PatientDetail/SymptomLog";
import {
  getPatientById,
  getPatientMedications,
  getPatientSymptoms,
  getAdherenceLogs,
  groupLogsByDay,
} from "@/lib/services/patients";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { title: "Paciente" };

  const { data } = await supabase
    .from("users")
    .select("institution_id")
    .eq("id", user.id)
    .single();

  const institutionId = (data as { institution_id?: string } | null)?.institution_id;

  if (!institutionId) return { title: "Paciente" };

  const patient = await getPatientById(id, institutionId);
  return { title: patient?.name ?? "Paciente" };
}

export default async function PatientDetailPage({ params }: PageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("users")
    .select("institution_id")
    .eq("id", user.id)
    .single();

  const institutionId = (data as { institution_id?: string } | null)?.institution_id;

  if (!institutionId) redirect("/login");

  const [patient, medications, symptoms, logs] = await Promise.all([
    getPatientById(id, institutionId),
    getPatientMedications(id),
    getPatientSymptoms(id),
    getAdherenceLogs(id),
  ]);

  if (!patient) notFound();

  const adherenceData = groupLogsByDay(logs);

  return (
    <>
      <TopBar title="Detalle del paciente" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Header del paciente */}
          <PatientHeader patient={patient} />

          {/* Grid: tratamiento + síntomas */}
          <div className="grid lg:grid-cols-2 gap-5">
            <TreatmentList medications={medications} />
            <SymptomLog symptoms={symptoms} />
          </div>

          {/* Historial de adherencia */}
          <AdherenceHistory data={adherenceData} />
        </div>
      </main>
    </>
  );
}

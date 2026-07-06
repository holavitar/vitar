import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/dashboard/TopBar";
import { PatientFilters } from "@/components/patients/PatientFilters";
import { PatientList } from "@/components/patients/PatientList";
import { getPatients } from "@/lib/services/patients";
import type { Metadata } from "next";
import type { Patient } from "@/types";

export const metadata: Metadata = { title: "Pacientes" };

interface PageProps {
  searchParams: Promise<{ q?: string; risk?: string }>;
}

function filterPatients(
  patients: Patient[],
  query: string,
  risk: string
): Patient[] {
  return patients.filter((p) => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.condition.toLowerCase().includes(query.toLowerCase());

    const matchesRisk = !risk || p.risk === risk;

    return matchesQuery && matchesRisk;
  });
}

export default async function PatientsPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("institution_id")
    .eq("id", user.id)
    .single();

  if (!profile?.institution_id) redirect("/login");

  const { q = "", risk = "" } = await searchParams;

  const allPatients = await getPatients(profile.institution_id);
  const filtered = filterPatients(allPatients, q, risk);

  return (
    <>
      <TopBar
        title="Pacientes"
        subtitle={`${allPatients.length} pacientes en seguimiento`}
      />

      <main className="flex-1 p-6 space-y-5 overflow-auto">
        {/* Resumen rápido */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Total",
              value: allPatients.length,
              sub: "en seguimiento",
            },
            {
              label: "Alto riesgo",
              value: allPatients.filter((p) => p.risk === "high").length,
              sub: "requieren atención",
              alert: true,
            },
            {
              label: "Buena adherencia",
              value: allPatients.filter((p) => p.adherence >= 80).length,
              sub: "≥ 80% adherencia",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-4 border ${
                stat.alert
                  ? "bg-[#11325b] border-[#11325b]"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <div
                className={`text-2xl font-bold leading-none mb-1 ${
                  stat.alert ? "text-white" : "text-[#11325b]"
                }`}
                style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {stat.value}
              </div>
              <div className={`text-xs font-medium ${stat.alert ? "text-white/80" : "text-gray-600"}`}>
                {stat.label}
              </div>
              <div
                className={`text-[10px] mt-0.5 ${stat.alert ? "text-white/50" : "text-gray-400"}`}
                style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Filtros — client component */}
        <Suspense fallback={null}>
          <PatientFilters />
        </Suspense>

        {/* Resultados */}
        <div>
          {q || risk ? (
            <p
              className="text-xs text-gray-400 mb-3"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{" "}
              {q && `para "${q}"`}
              {risk && ` · riesgo ${risk === "high" ? "alto" : risk === "medium" ? "medio" : "bajo"}`}
            </p>
          ) : null}
          <PatientList patients={filtered} query={q} />
        </div>
      </main>
    </>
  );
}

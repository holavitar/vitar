import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/dashboard/TopBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { AdherenceChart } from "@/components/dashboard/AdherenceChart";
import { RiskTable } from "@/components/dashboard/RiskTable";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import {
  getDashboardKPIs,
  getAdherenceTrend,
  getHighRiskPatients,
  getRecentAlerts,
} from "@/lib/services/dashboard";
import {
  Users,
  TrendingUp,
  Bell,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resumen" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("institution_id")
    .eq("id", user.id)
    .single();

  if (!profile?.institution_id) redirect("/login");

  const institutionId = profile.institution_id;

  const [kpis, trend, riskPatients, recentAlerts] = await Promise.all([
    getDashboardKPIs(institutionId),
    getAdherenceTrend(institutionId),
    getHighRiskPatients(institutionId),
    getRecentAlerts(institutionId),
  ]);

  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <TopBar
        title="Resumen"
        subtitle={today.charAt(0).toUpperCase() + today.slice(1)}
      />

      <main className="flex-1 p-6 space-y-6 overflow-auto">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Pacientes en seguimiento"
            value={kpis.totalPatients}
            icon={Users}
            subtitle="activos este mes"
          />
          <StatCard
            title="Adherencia promedio"
            value={`${kpis.averageAdherence}%`}
            icon={TrendingUp}
            trend={kpis.averageAdherence >= 80 ? "up" : kpis.averageAdherence >= 60 ? "neutral" : "down"}
            trendLabel={kpis.averageAdherence >= 80 ? "Buena" : kpis.averageAdherence >= 60 ? "Regular" : "Crítica"}
            subtitle="últimos 30 días"
          />
          <StatCard
            title="Alertas activas"
            value={kpis.activeAlerts}
            icon={Bell}
            trend={kpis.activeAlerts > 0 ? "down" : "up"}
            trendLabel={kpis.activeAlerts > 0 ? "Requieren atención" : "Sin alertas"}
            highlight={kpis.activeAlerts > 0}
          />
          <StatCard
            title="Reinternaciones evitadas"
            value={kpis.avoideRehospitalizations}
            icon={ShieldCheck}
            subtitle="pacientes sobre 80% adherencia"
            trend="up"
            trendLabel="este mes"
          />
        </div>

        {/* Gráfico + Alertas */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AdherenceChart data={trend} />
          </div>
          <div>
            <RecentAlerts alerts={recentAlerts} />
          </div>
        </div>

        {/* Tabla de riesgo */}
        <RiskTable patients={riskPatients} />

      </main>
    </>
  );
}

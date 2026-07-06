import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/dashboard/TopBar";
import { AlertsTable } from "@/components/alerts/AlertsTable";
import { AlertsFilter } from "@/components/alerts/AlertsFilter";
import { getAlerts } from "@/lib/services/alerts";
import { AlertTriangle, CheckCircle, Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Alertas" };

interface PageProps {
  searchParams: Promise<{ status?: "active" | "resolved" }>;
}

export default async function AlertsPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("institution_id")
    .eq("id", user.id)
    .single();

  if (!profile?.institution_id) redirect("/login");

  const { status = "active" } = await searchParams;

  const [activeAlerts, resolvedAlerts, currentAlerts] = await Promise.all([
    getAlerts(profile.institution_id, "active"),
    getAlerts(profile.institution_id, "resolved"),
    getAlerts(profile.institution_id, status),
  ]);

  const highCount   = activeAlerts.filter((a) => a.priority === "high").length;
  const mediumCount = activeAlerts.filter((a) => a.priority === "medium").length;

  return (
    <>
      <TopBar
        title="Alertas"
        subtitle="Monitoreo de situaciones de riesgo"
      />

      <main className="flex-1 p-6 space-y-5 overflow-auto">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`rounded-2xl p-4 border ${highCount > 0 ? "bg-[#11325b] border-[#11325b]" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highCount > 0 ? "bg-white/10" : "bg-[#ac1c37]/8"}`}>
                <AlertTriangle size={16} className={highCount > 0 ? "text-[#e7ba61]" : "text-[#ac1c37]"} />
              </div>
            </div>
            <div className={`text-2xl font-bold leading-none mb-1 ${highCount > 0 ? "text-white" : "text-[#11325b]"}`}
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              {highCount}
            </div>
            <div className={`text-xs font-medium ${highCount > 0 ? "text-white/80" : "text-gray-600"}`}>
              Prioridad alta
            </div>
            <div className={`text-[10px] mt-0.5 ${highCount > 0 ? "text-white/45" : "text-gray-400"}`}
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              requieren atención inmediata
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#e7ba61]/12 flex items-center justify-center">
                <Bell size={16} className="text-[#9a7520]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#11325b] leading-none mb-1"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              {mediumCount}
            </div>
            <div className="text-xs font-medium text-gray-600">Prioridad media</div>
            <div className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              a monitorear
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={16} className="text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#11325b] leading-none mb-1"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              {resolvedAlerts.length}
            </div>
            <div className="text-xs font-medium text-gray-600">Resueltas</div>
            <div className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              total histórico
            </div>
          </div>
        </div>

        {/* Filter + table */}
        <div className="flex items-center justify-between">
          <Suspense fallback={null}>
            <AlertsFilter />
          </Suspense>
          <span className="text-xs text-gray-400" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            {currentAlerts.length} alerta{currentAlerts.length !== 1 ? "s" : ""}
          </span>
        </div>

        <AlertsTable alerts={currentAlerts} showResolved={status === "resolved"} />
      </main>
    </>
  );
}

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShieldCheck, TrendingUp } from "lucide-react";
import { formatARS } from "@/lib/utils";
import type { RoiMetrics } from "@/types";

interface RoiPanelProps {
  metrics: RoiMetrics;
}

const HEADING_FONT =
  "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const BODY_FONT = "Verdana, Geneva, sans-serif";

interface BarTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; valor: number } }>;
}

function BarTooltip({ active, payload }: BarTooltipProps) {
  if (!active || !payload?.length) return null;
  const { name, valor } = payload[0].payload;
  return (
    <div className="bg-[#11325b] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <div className="text-white/60 mb-0.5">{name}</div>
      <div className="font-bold text-[#e7ba61]">{formatARS(valor)}</div>
    </div>
  );
}

export function RoiPanel({ metrics }: RoiPanelProps) {
  const chartData = [
    { name: "Costo Vitar / mes", valor: metrics.costoMensualARS, fill: "#11325b" },
    { name: "Ahorro estimado", valor: metrics.ahorroBrutoARS, fill: "#e7ba61" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-[#11325b] text-sm" style={{ fontFamily: HEADING_FONT }}>
            Retorno de inversión (ROI)
          </h3>
          <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: BODY_FONT }}>
            Reinternaciones evitadas valorizadas · plan {metrics.plan}
          </p>
        </div>
        {metrics.roiMultiplo > 0 && (
          <div className="flex items-center gap-1.5 bg-[#e7ba61]/15 text-[#11325b] px-3 py-1.5 rounded-full">
            <TrendingUp size={14} className="text-[#11325b]" />
            <span className="text-sm font-bold" style={{ fontFamily: HEADING_FONT }}>
              {metrics.roiMultiplo.toLocaleString("es-AR")}x
            </span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Columna de métricas */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl bg-[#11325b]/[0.04] p-3">
            <div className="w-8 h-8 rounded-lg bg-[#11325b]/6 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} className="text-[#11325b]" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#11325b] leading-none" style={{ fontFamily: HEADING_FONT }}>
                {metrics.reinternacionesEvitadas}
              </div>
              <div className="text-xs text-gray-500 mt-1">Reinternaciones evitadas este mes</div>
              <div className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: BODY_FONT }}>
                {formatARS(metrics.costoReinternacionARS)} c/u · pacientes ≥ 80% adherencia
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-100 p-3">
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Ahorro estimado</div>
              <div className="text-sm font-bold text-[#11325b] mt-1" style={{ fontFamily: HEADING_FONT }}>
                {formatARS(metrics.ahorroBrutoARS)}
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 p-3">
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Costo suscripción</div>
              <div className="text-sm font-bold text-[#11325b] mt-1" style={{ fontFamily: HEADING_FONT }}>
                {formatARS(metrics.costoMensualARS)}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#11325b] p-3">
            <div className="text-[10px] text-white/50 uppercase tracking-wide">Ahorro neto mensual</div>
            <div className="text-xl font-bold text-[#e7ba61] mt-1" style={{ fontFamily: HEADING_FONT }}>
              {formatARS(metrics.ahorroNetoARS)}
            </div>
          </div>
        </div>

        {/* Columna del gráfico comparativo */}
        <div className="flex flex-col">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "#9ca3af", fontFamily: BODY_FONT }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9ca3af", fontFamily: BODY_FONT }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${Math.round(v / 1_000_000)}M`}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "#f7f7f7" }} />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]} maxBarSize={64}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
            Modelo TIF §8.2: cada reinternación evitada equivale a{" "}
            {formatARS(metrics.costoReinternacionARS)} de ahorro para la institución.
          </p>
        </div>
      </div>
    </div>
  );
}

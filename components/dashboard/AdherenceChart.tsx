"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AdherenceDataPoint } from "@/types";

interface AdherenceChartProps {
  data: AdherenceDataPoint[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#11325b] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <div className="text-white/60 mb-0.5">{label ? formatDate(label) : ""}</div>
      <div className="font-bold text-[#e7ba61]">{payload[0].value}% adherencia</div>
    </div>
  );
}

export function AdherenceChart({ data }: AdherenceChartProps) {
  // Mostrar solo cada 5 días en el eje X para no saturar
  const thinData = data.filter((_, i) => i % 5 === 0 || i === data.length - 1);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3
            className="font-bold text-[#11325b] text-sm"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Evolución de adherencia
          </h3>
          <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            Últimos 30 días · promedio institucional
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#11325b]" />
          <span className="text-xs text-gray-400">Adherencia %</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            ticks={thinData.map((d) => d.date)}
            tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Verdana, Geneva, sans-serif" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Verdana, Geneva, sans-serif" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Zona de riesgo */}
          <Line
            type="monotone"
            dataKey="adherence"
            stroke="#11325b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#11325b", stroke: "#e7ba61", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Línea de referencia 60% */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
        <span className="w-6 h-px bg-[#ac1c37] inline-block" />
        <span className="text-[10px] text-gray-400" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          Umbral de alerta: 60%
        </span>
      </div>
    </div>
  );
}

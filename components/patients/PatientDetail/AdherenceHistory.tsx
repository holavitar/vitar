"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DayData {
  date: string;
  taken: number;
  total: number;
  pct: number;
}

interface AdherenceHistoryProps {
  data: DayData[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DayData }>;
  label?: string;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#11325b] text-white text-xs px-3 py-2.5 rounded-xl shadow-lg min-w-[120px]">
      <div className="text-white/60 mb-1">{formatDate(d.date)}</div>
      <div className="font-bold text-[#e7ba61] text-base">{d.pct}%</div>
      <div className="text-white/50 text-[10px] mt-0.5">
        {d.taken} de {d.total} tomas
      </div>
    </div>
  );
}

export function AdherenceHistory({ data }: AdherenceHistoryProps) {
  const thinData = data.filter((_, i) => i % 5 === 0 || i === data.length - 1);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="mb-5">
        <h2
          className="font-bold text-[#11325b] text-sm"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Historial de adherencia
        </h2>
        <p
          className="text-gray-400 text-xs mt-0.5"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          Últimos 30 días · por día
        </p>
      </div>

      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          Sin registros en los últimos 30 días.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              ticks={thinData.map((d) => d.date)}
              tick={{ fontSize: 9, fill: "#9ca3af", fontFamily: "Verdana, Geneva, sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: "#9ca3af", fontFamily: "Verdana, Geneva, sans-serif" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
            <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.pct < 60
                      ? "#ac1c37"
                      : entry.pct < 80
                      ? "#e7ba61"
                      : "#11325b"
                  }
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Leyenda */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50">
        {[
          { color: "bg-[#11325b]", label: "≥ 80%" },
          { color: "bg-[#e7ba61]", label: "60–79%" },
          { color: "bg-[#ac1c37]", label: "< 60%" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
            <span
              className="text-[10px] text-gray-400"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

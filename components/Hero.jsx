export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#11325b] flex items-center overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />

      {/* Warm glow top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e7ba61] opacity-[0.07] blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7ba61]" />
              <span className="text-white/70 text-xs font-medium uppercase tracking-widest">
                Para clínicas, obras sociales y prepagas
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-5"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Reducí internaciones evitables sin cambiar tu operación actual
            </h1>

            <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "15px" }}>
              Vitar permite a clínicas y obras sociales monitorear la adherencia de sus pacientes
              y detectar abandono terapéutico en tiempo real. Sin integración compleja. Sin fricción.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a href="#demo"
                className="bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200 shadow-md text-center">
                Solicitar demo
              </a>
              <a href="#solucion"
                className="border border-white/25 hover:border-white/50 text-white/80 hover:text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-all duration-200 text-center">
                Ver cómo funciona →
              </a>
            </div>

            {/* 3 stats — honest and specific */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-white/10">
              {[
                { value: "~50%", label: "de pacientes no cumple su tratamiento" },
                { value: "2 días", label: "sin registro dispara alerta automática" },
                { value: "1 internación", label: "evitada paga el uso de Vitar" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-[#e7ba61] font-bold text-xl mb-0.5">{stat.value}</div>
                  <div className="text-white/45 text-xs leading-snug" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard mockup, honest MVP */}
          <div className="hidden lg:block">
            <div className="bg-white/8 border border-white/12 rounded-2xl overflow-hidden shadow-2xl">
              {/* Top bar */}
              <div className="bg-white/5 border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ac1c37]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e7ba61]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                </div>
                <span className="text-white/40 text-xs">Panel institucional · Vitar</span>
                <div className="w-16" />
              </div>

              <div className="p-5 space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">Pacientes activos</div>
                    <div className="text-white/40 text-xs">Actualizado hace 4 min</div>
                  </div>
                  <span className="bg-[#e7ba61] text-[#11325b] text-xs font-bold px-2.5 py-1 rounded-full">
                    En vivo
                  </span>
                </div>

                {/* Summary numbers */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { n: "247", label: "Pacientes" },
                    { n: "84%", label: "Adherencia prom." },
                    { n: "6", label: "Alertas activas", alert: true },
                  ].map((c) => (
                    <div key={c.label}
                      className={`rounded-xl p-3 ${c.alert ? "bg-[#ac1c37]/25 border border-[#ac1c37]/40" : "bg-white/8"}`}>
                      <div className={`font-bold text-lg ${c.alert ? "text-red-300" : "text-white"}`}>{c.n}</div>
                      <div className="text-white/45 text-xs">{c.label}</div>
                    </div>
                  ))}
                </div>

                {/* Patient list */}
                <div className="space-y-1.5">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Pacientes en riesgo</div>
                  {[
                    { name: "Roberto M.", days: "3 días sin registro", pct: 42 },
                    { name: "Carmen L.", days: "2 días sin registro", pct: 58 },
                    { name: "Héctor P.", days: "2 días sin registro", pct: 61 },
                  ].map((p) => (
                    <div key={p.name} className="bg-white/5 rounded-lg px-3 py-2.5 flex items-center justify-between">
                      <div>
                        <div className="text-white text-xs font-medium">{p.name}</div>
                        <div className="text-[#f87171] text-xs">{p.days}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-white/50 text-xs">{p.pct}%</div>
                        <div className="w-16 bg-white/10 rounded-full h-1">
                          <div className="bg-[#ac1c37]/80 h-1 rounded-full" style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alert callout */}
                <div className="bg-[#ac1c37]/20 border border-[#ac1c37]/35 rounded-xl p-3 flex gap-3 items-center">
                  <span className="text-red-300 text-base">⚠</span>
                  <div className="flex-1">
                    <div className="text-white text-xs font-semibold">Roberto M. — sin registro hace 3 días</div>
                    <div className="text-white/50 text-xs">Alerta enviada al médico tratante</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

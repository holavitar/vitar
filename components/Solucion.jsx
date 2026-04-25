export default function Solucion() {
  return (
    <section id="solucion" className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#11325b]/8 border border-[#11325b]/15 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#11325b]" />
              <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">La solución</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight mb-5"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Seguimiento terapéutico simple, automatizado y medible
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}>
              Vitar no requiere cambiar cómo trabajan hoy. Se suma al flujo existente
              y agrega visibilidad donde antes no había ninguna.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "💊",
                  who: "Para el paciente",
                  title: "Recordatorios y check de medicación",
                  detail: "El paciente recibe un recordatorio diario y marca si tomó su medicación. Simple. Sin app adicional.",
                },
                {
                  icon: "🔔",
                  who: "Para el equipo médico",
                  title: "Alertas automáticas de abandono",
                  detail: "Si un paciente no registra adherencia por 2 días, el equipo recibe una alerta. Sin tener que revisar uno por uno.",
                },
                {
                  icon: "📊",
                  who: "Para la institución",
                  title: "Dashboard con adherencia por paciente",
                  detail: "Listado de pacientes, % de adherencia y quiénes están en riesgo. Sin complejidad innecesaria.",
                },
              ].map((item) => (
                <div key={item.title}
                  className="flex gap-4 p-5 rounded-xl bg-[#f2f2f2] hover:bg-[#11325b] group transition-colors duration-300">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-[#e7ba61] mb-0.5 uppercase tracking-wider">{item.who}</div>
                    <div className="font-bold text-[#11325b] group-hover:text-white text-sm mb-1 transition-colors">{item.title}</div>
                    <div className="text-gray-500 group-hover:text-white/65 transition-colors"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-2">
              <span className="text-[#11325b] font-bold text-sm">Sin cambiar el flujo de trabajo actual.</span>
            </div>
          </div>

          {/* RIGHT — Patient view mockup */}
          <div className="space-y-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Lo que ve el paciente
            </div>

            {/* Phone mockup */}
            <div className="bg-[#f2f2f2] rounded-2xl p-6 border border-gray-200 max-w-xs mx-auto">
              <div className="bg-[#11325b] rounded-xl p-4 mb-4">
                <div className="text-white/60 text-xs mb-1">Vitar · Recordatorio</div>
                <div className="text-white text-sm font-medium mb-3">
                  ¿Tomaste tu Enalapril 10mg de hoy?
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#e7ba61] text-[#11325b] text-xs font-bold py-2 rounded-lg">
                    ✓ Sí, la tomé
                  </button>
                  <button className="flex-1 bg-white/10 text-white text-xs py-2 rounded-lg">
                    No todavía
                  </button>
                </div>
              </div>
              <div className="text-center text-gray-400 text-xs">Historial de esta semana</div>
              <div className="flex gap-2 mt-2 justify-center">
                {["L","M","X","J","V","S","D"].map((d, i) => (
                  <div key={d} className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i < 5 ? "bg-[#11325b] text-white" : i === 5 ? "bg-[#e7ba61] text-[#11325b]" : "bg-gray-200 text-gray-400"
                    }`}>
                      {i < 5 ? "✓" : i === 5 ? "?" : "—"}
                    </div>
                    <span className="text-gray-400 text-xs">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">
              Lo que ve el equipo médico
            </div>

            {/* Small dashboard snippet */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <span className="text-[#11325b] font-semibold text-xs">Pacientes — vista rápida</span>
                <span className="text-xs text-gray-400">hoy</span>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { name: "Ana G.", adherencia: 95, status: "ok" },
                  { name: "Roberto M.", adherencia: 42, status: "riesgo" },
                  { name: "Carmen L.", adherencia: 58, status: "riesgo" },
                  { name: "Luis T.", adherencia: 88, status: "ok" },
                ].map((p) => (
                  <div key={p.name} className="px-4 py-2.5 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-gray-700">{p.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${p.status === "riesgo" ? "bg-[#ac1c37]" : "bg-[#11325b]"}`}
                          style={{ width: `${p.adherencia}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${p.status === "riesgo" ? "text-[#ac1c37]" : "text-[#11325b]"}`}>
                        {p.adherencia}%
                      </span>
                      {p.status === "riesgo" && (
                        <span className="bg-[#ac1c37]/10 text-[#ac1c37] text-xs px-1.5 py-0.5 rounded font-medium">
                          Alerta
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

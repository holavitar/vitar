export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#11325b]/8 border border-[#11325b]/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11325b]" />
            <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Beneficios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] mb-3"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            Convertís seguimiento en ahorro
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto"
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            Tres tipos de impacto. Todos medibles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "💰",
              label: "Económico",
              title: "Menos costos innecesarios",
              items: [
                "Menos internaciones evitables",
                "Menos reingresos hospitalarios",
                "Menos urgencias prevenibles",
              ],
              highlight: true,
            },
            {
              icon: "🩺",
              label: "Clínico",
              title: "Más control sobre el paciente",
              items: [
                "Mayor adherencia terapéutica",
                "Detección temprana de abandono",
                "Intervención antes de que escale",
              ],
            },
            {
              icon: "⚙️",
              label: "Operativo",
              title: "Menos carga para el equipo",
              items: [
                "Alertas automáticas, sin revisión manual",
                "Dashboard simple, sin capacitación larga",
                "Implementación en días, no meses",
              ],
            },
          ].map((b) => (
            <div key={b.label}
              className={`rounded-2xl p-7 border flex flex-col gap-5 ${
                b.highlight
                  ? "bg-[#11325b] border-[#11325b]"
                  : "bg-white border-gray-100 shadow-sm"
              }`}>
              <div>
                <div className="text-2xl mb-3">{b.icon}</div>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${b.highlight ? "text-[#e7ba61]" : "text-gray-400"}`}>
                  {b.label}
                </div>
                <h3 className={`font-bold text-base ${b.highlight ? "text-white" : "text-[#11325b]"}`}>
                  {b.title}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {b.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#e7ba61] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className={`text-sm ${b.highlight ? "text-white/75" : "text-gray-500"}`}
                      style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

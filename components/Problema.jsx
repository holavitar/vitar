export default function Problema() {
  return (
    <section className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#ac1c37]/10 border border-[#ac1c37]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ac1c37]" />
            <span className="text-[#ac1c37] text-xs font-semibold uppercase tracking-widest">El problema</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            El problema no es el tratamiento. Es la falta de seguimiento.
          </h2>
        </div>

        {/* Three stark facts */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: "📉",
              stat: "~50%",
              label: "de los pacientes no cumple su tratamiento",
              detail: "La mayoría abandona entre consultas. El médico no se entera hasta que el cuadro empeoró.",
            },
            {
              icon: "🔍",
              stat: "Sin visibilidad",
              label: "entre consulta y consulta",
              detail: "Hoy no hay forma de saber si el paciente tomó su medicación o si está siguiendo el tratamiento.",
            },
            {
              icon: "⏱",
              stat: "Tarde",
              label: "se detecta el abandono terapéutico",
              detail: "Cuando se detecta el desvío, el daño clínico ya está hecho. La internación muchas veces es inevitable.",
            },
          ].map((item) => (
            <div key={item.label}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <div className="text-2xl font-bold text-[#ac1c37] leading-none mb-1"
                  style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-[#11325b] mb-2">{item.label}</div>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Consequence callout */}
        <div className="bg-[#11325b] rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="text-3xl">💸</div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-white font-bold text-base mb-1">
              Resultado: costos evitables + reinternaciones
            </div>
            <div className="text-white/55 text-sm" style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
              Cada internación evitable representa un costo directo significativo para la institución, además del impacto en la salud del paciente.
            </div>
          </div>
          <a href="#solucion"
            className="whitespace-nowrap bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] font-bold text-sm px-6 py-3 rounded-lg transition-colors">
            Ver la solución →
          </a>
        </div>

      </div>
    </section>
  );
}

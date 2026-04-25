export default function ImpactoEconomico() {
  return (
    <section className="bg-[#11325b] py-20 lg:py-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#e7ba61] opacity-[0.06] blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e7ba61]/20 border border-[#e7ba61]/30 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7ba61]" />
              <span className="text-[#e7ba61] text-xs font-semibold uppercase tracking-widest">Impacto económico</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Una sola intervención a tiempo puede evitar una internación
            </h2>

            <p className="text-white/60 leading-relaxed mb-8"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}>
              El costo de una internación evitable supera en muchas veces el costo anual de Vitar.
              Para la mayoría de las instituciones, el retorno se justifica desde el primer paciente intervenido.
            </p>

            <div className="bg-[#e7ba61] rounded-2xl px-7 py-5 inline-block">
              <div className="text-[#11325b] font-bold text-lg leading-tight"
                style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Eso paga el uso de Vitar.
              </div>
              <div className="text-[#11325b]/70 text-sm mt-1"
                style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                Sin necesidad de evitar decenas de internaciones para justificar la inversión.
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            {[
              {
                label: "Costo promedio de 1 internación evitable",
                sub: "costos directos · estimación sector salud Argentina",
                value: "$800K – $2M",
                highlight: false,
              },
              {
                label: "Costo de NO detectar abandono a tiempo",
                sub: "urgencias, reinternaciones, daño clínico acumulado",
                value: "Evitable",
                highlight: false,
              },
              {
                label: "Lo que necesitás evitar para justificar Vitar",
                sub: "en la mayoría de los casos",
                value: "1 internación",
                highlight: true,
              },
            ].map((row) => (
              <div key={row.label}
                className={`rounded-xl p-5 flex items-center justify-between gap-4 ${
                  row.highlight
                    ? "bg-[#e7ba61]"
                    : "bg-white/6 border border-white/10"
                }`}>
                <div>
                  <div className={`text-sm font-medium ${row.highlight ? "text-[#11325b]" : "text-white/80"}`}>
                    {row.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${row.highlight ? "text-[#11325b]/60" : "text-white/35"}`}
                    style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                    {row.sub}
                  </div>
                </div>
                <div className={`font-bold text-base whitespace-nowrap ${row.highlight ? "text-[#11325b]" : "text-white"}`}>
                  {row.value}
                </div>
              </div>
            ))}

            <p className="text-white/30 text-xs pt-1"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              * Los valores son estimaciones de referencia. El impacto real varía según la institución y el perfil de pacientes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

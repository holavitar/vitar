export default function Alertas() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT: alert mockup */}
          <div className="space-y-3">
            {/* Alert example card */}
            <div className="bg-[#ac1c37]/8 border border-[#ac1c37]/25 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ac1c37]/15 flex items-center justify-center text-xl flex-shrink-0">
                  ⚠️
                </div>
                <div>
                  <div className="font-bold text-[#11325b] text-sm mb-0.5">Alerta: Roberto M.</div>
                  <div className="text-gray-600 text-sm mb-3">Sin registro de medicación hace <strong>3 días</strong></div>
                  <div className="flex gap-2">
                    <button className="bg-[#11325b] text-white text-xs px-4 py-2 rounded-lg font-medium">
                      Contactar paciente
                    </button>
                    <button className="border border-gray-200 text-gray-600 text-xs px-4 py-2 rounded-lg">
                      Ver historial
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Normal state */}
            <div className="bg-[#f2f2f2] border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#11325b]/10 flex items-center justify-center text-base flex-shrink-0">✅</div>
              <div>
                <div className="font-semibold text-[#11325b] text-sm">Ana G. — Sin novedades</div>
                <div className="text-gray-400 text-xs">Adherencia del 95% en los últimos 30 días</div>
              </div>
              <div className="ml-auto text-[#11325b] font-bold text-sm">95%</div>
            </div>

            <div className="bg-[#f2f2f2] border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#e7ba61]/20 flex items-center justify-center text-base flex-shrink-0">⚡</div>
              <div>
                <div className="font-semibold text-[#11325b] text-sm">Carmen L. — Seguimiento activo</div>
                <div className="text-gray-400 text-xs">2 días sin registro. Alerta enviada al médico</div>
              </div>
              <div className="ml-auto text-[#e7ba61] font-bold text-sm">58%</div>
            </div>

            <p className="text-gray-400 text-xs text-center pt-2"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              Las alertas llegan por email. No hace falta estar mirando el panel.
            </p>
          </div>

          {/* RIGHT: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#ac1c37]/10 border border-[#ac1c37]/20 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ac1c37]" />
              <span className="text-[#ac1c37] text-xs font-semibold uppercase tracking-widest">Alertas automáticas</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight mb-5"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Detectá abandono antes de que se convierta en un problema
            </h2>

            <p className="text-gray-500 leading-relaxed mb-7"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}>
              Cuando un paciente deja de cumplir su tratamiento, el sistema detecta el desvío automáticamente
              y alerta al equipo médico. Sin tener que revisar listados manualmente.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { label: "El sistema alerta automáticamente", sub: "Cuando detecta 2 días consecutivos sin registro." },
                { label: "Podés intervenir a tiempo", sub: "Antes de que el abandono derive en una urgencia o internación." },
                { label: "Sin carga de trabajo adicional", sub: "Las alertas te llegan. No tenés que buscarlas." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e7ba61] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#11325b] font-bold text-xs">→</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#11325b] text-sm">{item.label}</div>
                    <div className="text-gray-500" style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#demo"
              className="inline-block bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200">
              Ver demo de alertas →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

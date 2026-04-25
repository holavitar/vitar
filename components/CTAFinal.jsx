export default function CTAFinal() {
  return (
    <section id="demo" className="bg-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#e7ba61]/20 border border-[#e7ba61]/40 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e7ba61] animate-pulse" />
            <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Demo gratuita · 30 minutos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight mb-4"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            Mirá Vitar funcionando con casos reales
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto"
            style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}>
            Te mostramos el panel, las alertas y el flujo del paciente.
            Sin PowerPoint. Sin compromiso.
          </p>
        </div>

        {/* Form — minimal fields */}
        <div className="max-w-md mx-auto bg-[#f2f2f2] rounded-2xl p-8 border border-gray-200">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Nombre y apellido
              </label>
              <input
                type="text"
                placeholder="Ej: María García"
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#11325b]/25 focus:border-[#11325b] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Email institucional
              </label>
              <input
                type="email"
                placeholder="nombre@institucion.com"
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#11325b]/25 focus:border-[#11325b] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Tipo de institución
              </label>
              <select className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#11325b]/25 focus:border-[#11325b] transition-all">
                <option value="">Seleccioná...</option>
                <option>Clínica / Sanatorio</option>
                <option>Obra social</option>
                <option>Prepaga</option>
                <option>Centro médico</option>
                <option>Hospital público</option>
              </select>
            </div>

            <button
              className="w-full bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] font-bold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md mt-2">
              Solicitar demo gratuita →
            </button>
          </div>

          <p className="text-gray-400 text-xs text-center mt-4"
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            Te contactamos en menos de 24 hs. Sin spam.
          </p>
        </div>

        {/* Trust row */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-gray-400"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          {["Sin compromiso", "Demo personalizada 1 a 1", "Sin tarjeta de crédito", "Soporte en español"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-[#e7ba61]">✓</span> {t}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

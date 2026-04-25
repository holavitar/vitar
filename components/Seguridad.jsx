export default function Seguridad() {
  return (
    <section id="seguridad" className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#11325b]/8 border border-[#11325b]/15 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#11325b]" />
              <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Seguridad</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight mb-5"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Seguridad desde el diseño, no como agregado
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}>
              Los datos de salud de tus pacientes están protegidos desde la arquitectura.
              Cumplimos con la normativa argentina vigente.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "🔐",
                  title: "Encriptación TLS + AES",
                  detail: "Datos cifrados en tránsito y en reposo. Estándar bancario.",
                },
                {
                  icon: "👥",
                  title: "Control de acceso por roles",
                  detail: "Cada profesional ve solo los pacientes que le corresponden.",
                },
                {
                  icon: "📋",
                  title: "Cumplimiento Ley 25.326",
                  detail: "Protección de Datos Personales. Cumplimiento normativo desde el inicio.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#11325b]/6 flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#11325b] text-sm mb-0.5">{item.title}</div>
                    <div className="text-gray-500"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Positioning statement */}
          <div className="bg-[#11325b] rounded-2xl p-10 flex flex-col justify-center">
            <div className="text-[#e7ba61] text-xs font-semibold uppercase tracking-widest mb-6">
              Por qué Vitar
            </div>
            <blockquote className="text-white text-2xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              "Vitar no es un sistema complejo. Es una herramienta simple que resuelve un problema caro."
            </blockquote>
            <p className="text-white/55 text-sm leading-relaxed"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
              No vendemos tecnología por la tecnología. Vendemos seguimiento terapéutico
              que se traduce en menos internaciones, menos costos y más control clínico.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10">
              <a href="#demo"
                className="inline-block bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200">
                Solicitar demo gratuita →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

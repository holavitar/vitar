export default function Implementacion() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#11325b]/8 border border-[#11325b]/15 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#11325b]" />
              <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Implementación</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight mb-5"
              style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Operativo en días, no en meses
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}>
              Vitar es una aplicación web. No requiere instalar nada, no requiere
              integración técnica compleja ni presupuesto de IT. Funciona desde el primer día.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🌐", title: "Web app, sin instalación", detail: "Accedés desde el navegador. Sin descargas, sin configuración de servidores." },
                { icon: "📁", title: "Carga de pacientes simple", detail: "Subís un listado. Nada más. No hace falta conectarse a tu sistema actual." },
                { icon: "💬", title: "El paciente no necesita una app", detail: "Los recordatorios llegan por WhatsApp o SMS. El paciente responde con un click." },
                { icon: "🎯", title: "Alineado a presupuesto real", detail: "Pensado para instituciones con recursos limitados. Sin costos de implementación sorpresa." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-[#f2f2f2] flex items-center justify-center text-lg flex-shrink-0">
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

          {/* RIGHT — Timeline visual */}
          <div className="bg-[#f2f2f2] rounded-2xl p-8 border border-gray-200">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
              De cero a operativo
            </div>
            <div className="space-y-0">
              {[
                { day: "Día 1", title: "Alta de cuenta y carga de pacientes", done: true },
                { day: "Día 2", title: "Primeros recordatorios enviados", done: true },
                { day: "Día 3", title: "Primeros registros de adherencia", done: true },
                { day: "Día 7", title: "Primera semana de datos y alertas activas", done: false },
                { day: "Día 30", title: "Visión completa de adherencia por paciente", done: false },
              ].map((item, i, arr) => (
                <div key={item.day} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      item.done ? "bg-[#11325b] text-[#e7ba61]" : "bg-gray-200 text-gray-400"
                    }`}>
                      {item.done ? "✓" : "○"}
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-px h-8 ${item.done ? "bg-[#11325b]/30" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className={`text-xs font-bold mb-0.5 ${item.done ? "text-[#11325b]" : "text-gray-400"}`}>
                      {item.day}
                    </div>
                    <div className={`text-sm ${item.done ? "text-gray-700" : "text-gray-400"}`}
                      style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

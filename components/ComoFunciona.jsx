export default function ComoFunciona() {
  const steps = [
    {
      n: "01",
      icon: "📋",
      title: "Cargás tus pacientes",
      detail: "Subís la lista de pacientes que querés monitorear. Sin integración compleja. Sin migración de datos.",
    },
    {
      n: "02",
      icon: "📲",
      title: "El paciente recibe recordatorios",
      detail: "Cada día, el paciente recibe un mensaje con el recordatorio de su medicación. Sin descargar una app.",
    },
    {
      n: "03",
      icon: "✅",
      title: "Marca su adherencia",
      detail: "Con un simple check, el paciente confirma que tomó su medicación. Queda registrado en el sistema.",
    },
    {
      n: "04",
      icon: "🔔",
      title: "Recibís alertas y métricas",
      detail: "Si un paciente falla 2 días, recibís una alerta. En el dashboard, ves el estado de adherencia de todos.",
    },
  ];

  return (
    <section id="como-funciona" className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#e7ba61]/20 border border-[#e7ba61]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e7ba61]" />
            <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Cómo funciona</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] mb-3"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            Simple. Sin fricción.
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto"
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            Cuatro pasos. Nada más.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div key={step.n}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#11325b] flex items-center justify-center">
                  <span className="text-[#e7ba61] font-bold text-xs">{step.n}</span>
                </div>
                <div className="text-2xl">{step.icon}</div>
              </div>
              <div>
                <h3 className="font-bold text-[#11325b] text-sm mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed"
                  style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

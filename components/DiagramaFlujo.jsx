// Diagrama de flujo del ciclo de seguimiento terapéutico (TIF — flujo de negocio).
// Refleja el bucle principal del MVP: la institución detecta la baja adherencia,
// interviene, el paciente registra la toma y el dashboard se actualiza.

const INSTITUCION = "#11325b";
const PACIENTE = "#e7ba61";

const PASOS = [
  { n: 1, actor: "Institución", color: INSTITUCION, icon: "👥", label: "Visualiza sus pacientes" },
  { n: 2, actor: "Institución", color: INSTITUCION, icon: "📉", label: "Detecta baja adherencia" },
  { n: 3, actor: "Institución", color: INSTITUCION, icon: "💬", label: "Envía un mensaje" },
  { n: 4, actor: "Paciente", color: PACIENTE, icon: "🔔", label: "Recibe el recordatorio" },
  { n: 5, actor: "Paciente", color: PACIENTE, icon: "✅", label: "Registra la toma" },
  { n: 6, actor: "Institución", color: INSTITUCION, icon: "📊", label: "El dashboard actualiza la adherencia" },
];

const HEADING = "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const BODY = "Verdana, Geneva, sans-serif";

function Arrow() {
  return (
    <div className="flex items-center justify-center text-gray-300 flex-shrink-0 lg:rotate-0 rotate-90">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function DiagramaFlujo() {
  return (
    <section id="flujo" className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#e7ba61]/20 border border-[#e7ba61]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e7ba61]" />
            <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Diagrama de flujo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] mb-3" style={{ fontFamily: HEADING }}>
            Un ciclo de seguimiento que se cierra solo
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto" style={{ fontFamily: BODY }}>
            Cada toma que el paciente registra realimenta el tablero de la institución.
            El seguimiento deja de ser una foto y pasa a ser un flujo continuo.
          </p>
        </div>

        {/* Leyenda de actores */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: INSTITUCION }} />
            <span className="text-xs font-medium text-gray-500" style={{ fontFamily: BODY }}>Institución</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: PACIENTE }} />
            <span className="text-xs font-medium text-gray-500" style={{ fontFamily: BODY }}>Paciente</span>
          </div>
        </div>

        {/* Flujo */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-2">
          {PASOS.map((paso, i) => (
            <div key={paso.n} className="flex flex-col lg:flex-row items-center gap-2 lg:flex-1">
              <div className="w-full bg-[#f2f2f2] rounded-2xl p-4 flex flex-col gap-3 border border-gray-100 h-full">
                <div className="flex items-center justify-between">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ background: paso.color, color: paso.actor === "Paciente" ? "#11325b" : "#fff" }}
                  >
                    {paso.n}
                  </span>
                  <span className="text-xl">{paso.icon}</span>
                </div>
                <p className="text-[12px] font-semibold text-[#11325b] leading-snug" style={{ fontFamily: BODY }}>
                  {paso.label}
                </p>
              </div>
              {i < PASOS.length - 1 && <Arrow />}
            </div>
          ))}
        </div>

        {/* Cierre del ciclo */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 bg-[#11325b] rounded-full pl-3 pr-5 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4v6h6M20 20v-6h-6" stroke="#e7ba61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 10a8 8 0 0 0-14.9-3M4 14a8 8 0 0 0 14.9 3" stroke="#e7ba61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white text-xs font-medium" style={{ fontFamily: BODY }}>
              El paso 6 realimenta el paso 1: el ciclo se repite en cada toma.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
